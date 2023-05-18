import React from "react";

interface EmbedApiProps {
  url: string;
}

const clientId = process.env.VITE_PUBLIC_ADOBE_CLIENT_ID as string;

const PDF_ID = "__PDF_ID__";

export const EmbedApi = (props: EmbedApiProps) => {
  const { url } = props;
  React.useEffect(() => {
    // const renderPdf = async () => {
    //   const view = new window.AdobeDC.View({
    //     clientId,
    //     divId: PDF_ID,
    //   });
    //   const config = {
    //     content: {
    //       location: {
    //         url: doc.pdf_url,
    //       },
    //     },
    //     metaData: {
    //       fileName: "document",
    //       id: "1234",
    //     },
    //   };
    //   const preview = await view.previewFile(config, DEFAULT_VIEW_CONFIG);
    //   await view.registerCallback(
    //     window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
    //     async (event: AdobeEvent) => {
    //       switch (event.type) {
    //         case "PREVIEW_SELECTION_END": {
    //           const internalApis = await preview.getAPIs();
    //           /**
    //            * For reasons that remain mysterious to me, the little
    //            * pop up that lets you create an annotation doesn't
    //            * show up unless you delay by 50 milliseconds.
    //            */
    //           await delay(50);
    //           const res = await internalApis.getSelectedContent();
    //           CURRENT_SELECTION_TEXT = res.data;
    //           break;
    //         }
    //         case "ANNOTATION_ADDED": {
    //           const added = event as AdobeAnnotationAddedEvent;
    //           setDoc((prev) => {
    //             const res = produce(prev, (draft) => {
    //               if (typeof draft === "string") return;
    //               added.data.bodyValue = CURRENT_SELECTION_TEXT;
    //               draft.user_responses.INTRO_DOCUMENT.highlights.push(
    //                 added.data
    //               );
    //             });
    //             return res;
    //           });
    //           break;
    //         }
    //         case "ANNOTATION_DELETED": {
    //           const deleted = event as AdobeAnnotationDeletedEvent;
    //           setDoc((prev) => {
    //             const res = produce(prev, (draft) => {
    //               if (typeof draft === "string") return;
    //               const { highlights } = draft.user_responses.INTRO_DOCUMENT;
    //               draft.user_responses.INTRO_DOCUMENT.highlights =
    //                 highlights.filter((x) => x.id !== deleted.data.id);
    //             });
    //             console.log(res);
    //             return res;
    //           });
    //           break;
    //         }
    //       }
    //     },
    //     {
    //       enablePDFAnalytics: true,
    //       enableFilePreviewEvents: true,
    //       enableAnnotationEvents: true,
    //     }
    //   );
    //   await Promise.all([preview.getAnnotationManager(), preview.getAPIs()]);
    //   setDoc((prev) => {
    //     if (typeof prev === "string") return prev;
    //     return {
    //       ...prev,
    //       pdfRef: preview,
    //     };
    //   });
    // };
    // renderPdf();
    // }, [doc.pdf_url, setDoc]);
  }, []);
  console.log(clientId);
  return <div style={{ height: "100%", width: "100%" }} id={PDF_ID} />;
};
