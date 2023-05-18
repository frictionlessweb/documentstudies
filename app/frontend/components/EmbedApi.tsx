import React from "react";

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
              console.log("added is ", added);
              console.log("manager is", manager);
              break;
            }
            case "ANNOTATION_DELETED": {
              const deleted = event as AdobeAnnotationDeletedEvent;
              console.log("deleted is", deleted);
              break;
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
  }, [url]);
  return <div style={{ height: "80vh", width: "100%" }} id={PDF_ID} />;
};
