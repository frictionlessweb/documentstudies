import React from "react";
import { PageV0 } from "@/core/types";
import { LayoutProps } from "@/pages/RunningExperiment/types";
import { Loading } from "@/components/Loading";
import { ApiError } from "@/components/ApiError";
import { EmbedApi } from '@/components/EmbedApi';
import { getDocumentByName } from "@/utils/util";
import { Flex } from "@adobe/react-spectrum";

type FetchPdfResult =
  | {
      fetchAttempted: false;
      isLoading: false;
      error: null;
      pdfUrl: null;
    }
  | {
      fetchAttempted: true;
      isLoading: true;
      error: null;
      pdfUrl: null;
    }
  | {
      fetchAttempted: true;
      isLoading: false;
      error: string;
      pdfUrl: null;
    }
  | {
      fetchAttempted: true;
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
      if (pdfResult.fetchAttempted) return;
      setPdfResult((prev) => {
        return {
          error: null,
          pdfUrl: null,
          fetchAttempted: true,
          isLoading: true,
        };
      });
      try {
        const { url } = await getDocumentByName(documentName);
        setPdfResult({
          error: null,
          pdfUrl: url,
          fetchAttempted: true,
          isLoading: false,
        });
      } catch (err) {
        setPdfResult((prev) => {
          return {
            fetchAttempted: true,
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
  const { page } = props;
  const { isLoading, error, pdfUrl } = useFetchPdf(page.pdf_document);
  if (isLoading) return <Loading />;
  if (error !== null || pdfUrl === null) return <ApiError />;
  return (
    <Flex width="100%">
      <Flex width="60%">
        <EmbedApi url={pdfUrl} />
      </Flex>
      <Flex width="40%">
        <p>test</p>
      </Flex>
    </Flex>
  );
};
