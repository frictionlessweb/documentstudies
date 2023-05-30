import React from "react";
import { LayoutProps } from "@/pages/RunningExperiment/types";
import { Loading } from "@/components/Loading";
import { ApiError } from "@/components/ApiError";
import { EmbedApi } from "@/components/EmbedApi";
import { getDocumentByName } from "@/utils/util";
import { Flex, Heading, View } from "@adobe/react-spectrum";

type FetchPdfResult =
  | {
      fetchAttempted: string | false;
      isLoading: false;
      error: null;
      pdfUrl: null;
    }
  | {
      fetchAttempted: string;
      isLoading: true;
      error: null;
      pdfUrl: null;
    }
  | {
      fetchAttempted: string;
      isLoading: false;
      error: string;
      pdfUrl: null;
    }
  | {
      fetchAttempted: string;
      isLoading: false;
      error: null;
      pdfUrl: string;
    };

const useFetchPdf = (documentName: string): FetchPdfResult => {
  const [pdfResult, setPdfResult] = React.useState<FetchPdfResult>({
    fetchAttempted: false,
    isLoading: false,
    error: null,
    pdfUrl: null,
  });
  React.useEffect(() => {
    const fetchPdf = async () => {
      if (pdfResult.fetchAttempted === documentName) {
        return;
      }
      setPdfResult((prev) => {
        return {
          error: null,
          pdfUrl: null,
          fetchAttempted: documentName,
          isLoading: true,
        };
      });
      try {
        const { url } = await getDocumentByName(`${documentName}.pdf`);
        setPdfResult({
          error: null,
          pdfUrl: url,
          fetchAttempted: documentName,
          isLoading: false,
        });
      } catch (err) {
        setPdfResult((prev) => {
          return {
            fetchAttempted: documentName,
            isLoading: false,
            error: "FETCH_FAILED",
            pdfUrl: null,
          };
        });
      }
    };
    fetchPdf();
  }, [pdfResult, documentName]);
  return pdfResult;
};

export const PdfLayout = (props: LayoutProps) => {
  const { page, children } = props;
  const { isLoading, error, pdfUrl } = useFetchPdf(page.document_id);
  if (isLoading) return <Loading />;
  if (error !== null || pdfUrl === null) return <ApiError />;
  return (
    <Flex
      direction="column"
      width="98vw"
      alignItems="center"
      marginY="size-0"
      gap="size-0"
    >
      <View borderTopWidth="thin" borderColor="light" width="100%"></View>
      <Flex width="100%" height="100%">
        <Flex width="65%" height="100%">
          <EmbedApi url={pdfUrl} />
        </Flex>
        <View
          borderStartWidth="thin"
          borderColor="light"
          width="35%"
          height="82vh"
          UNSAFE_style={{ overflowY: "scroll" }}
        >
          <Flex marginX="size-200" direction="column">
            {children}
          </Flex>
        </View>
      </Flex>
    </Flex>
  );
};
