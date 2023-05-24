import React from "react";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";

interface EmbedApiProps {
  url: string;
}

interface Manager {
  removeAllAnnotations: () => Promise<void>;
  addAnnotations: (annotations: any[]) => Promise<void>;
  setConfig: (config: any) => Promise<void>;
  selectAnnotation: (annotation: any) => void | Promise<void>;
}

declare global {
  interface Window {
    AdobeDC: any;
    annotationManager: null | Manager;
  }
}

window.annotationManager = null;

interface AdobeEvent {
  type: string;
  data: unknown;
}

interface AdobeAnnotationAddedEvent {
  type: "ANNOTATION_ADDED";
  data: {
    id: string;
    target: {
      selector: {
        node: {
          index: number;
        };
        quadPoints: Array<number>;
      };
    };
  };
}

interface AdobeAnnotationDeletedEvent {
  type: "ANNOTATION_DELETED";
  data: {
    id: string;
  };
}

const clientId = process.env.VITE_PUBLIC_ADOBE_CLIENT_ID as string;

const PDF_ID = "__PDF_ID__";

const DEFAULT_VIEW_CONFIG = {
  embedMode: "FULL_WINDOW",
  showDownloadPDF: false,
  showFullScreen: false,
  showPrintPDF: false,
  enableAnnotationAPIs: true,
  includePDFAnnotations: true,
} as const;

export const EmbedApi = (props: EmbedApiProps) => {
  const { curPage, annotations } = useStudy((study) => {
    return {
      curPage: study.page_index,
      annotations:
        study.content[study.group]?.pages[study.page_index]!.tasks.filter(
          (task) => task.documentSource !== undefined
        ).map((task) => task.documentSource!.annotation) || [],
    };
  });
  const setStudy = useSetStudy();
  const { url } = props;
  React.useEffect(() => {
    const renderPdf = async () => {
      const view = new window.AdobeDC.View({
        clientId,
        divId: PDF_ID,
      });
      const config = {
        content: {
          location: {
            url: url,
          },
        },
        metaData: {
          fileName: "document",
          id: "1234",
        },
      };
      const preview = await view.previewFile(config, DEFAULT_VIEW_CONFIG);
      const [directManager, apis] = await Promise.all([
        preview.getAnnotationManager(),
        preview.getAPIs(),
      ]);
      const manager: Manager = directManager;
      await manager.setConfig({ showCommentsPanel: false });
      window.annotationManager = manager;
      if (annotations.length > 0) {
        await manager.addAnnotations(annotations);
      }
      await view.registerCallback(
        window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        async (event: AdobeEvent) => {
          switch (event.type) {
            case "ANNOTATION_ADDED": {
              const added = event as AdobeAnnotationAddedEvent;
              setStudy((ctx) => {
                return produce(ctx, (study) => {
                  const { pages } = study.content[study.group]!;
                  const currentPage = pages[curPage]!;
                  const currentTask = currentPage.tasks[0]!;
                  if (currentTask.tag !== "highlights") return;
                  currentTask.user_response.push(added.data);
                });
              });
              break;
            }
            case "ANNOTATION_DELETED": {
              const deleted = event as AdobeAnnotationDeletedEvent;
              setStudy((ctx) => {
                return produce(ctx, (study) => {
                  const { pages } = study.content[study.group]!;
                  const currentPage = pages[curPage]!;
                  const currentTask = currentPage.tasks[0]!;
                  if (currentTask.tag !== "highlights") return;
                  const currentHighlights = currentTask.user_response;
                  const newHighlights = currentHighlights.filter(
                    (highlight) => highlight.id !== deleted.data.id
                  );
                  currentTask.user_response = newHighlights;
                });
              });
            }
          }
        },
        {
          enablePDFAnalytics: true,
          enableFilePreviewEvents: true,
          enableAnnotationEvents: true,
        }
      );
    };
    renderPdf();
  }, [url, curPage, setStudy]);
  return <div style={{ height: "80vh", width: "100%" }} id={PDF_ID} />;
};
