import React from "react";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";
import { TaskTypeV0DocumentHighlights } from "@/core/types";

interface EmbedApiProps {
  url: string;
}

declare global {
  interface Window {
    AdobeDC: any;
  }
}

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

interface Manager {
  removeAllAnnotations: () => Promise<void>;
}

export const EmbedApi = (props: EmbedApiProps) => {
  const curPage = useStudy((study) => {
    return study.page_index;
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
                  if (currentTask.type.tag !== "highlights") return;
                  currentTask.type.user_response.push(added.data);
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
                  if (currentTask.type.tag !== "highlights") return;
                  const currentHighlights = currentTask.type.user_response;
                  const newHighlights = currentHighlights.filter(
                    (highlight) => highlight.id !== deleted.data.id
                  );
                  currentTask.type.user_response = newHighlights;
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
