import { useState } from "react";
import { useCvData, usePortfolioItems } from "../hooks/useSupabaseData.js";
import { generateCvPdf } from "./generateCvPdf.js";
import "./CvExportButton.css";

function CvExportButton() {
    const { data: profileData, loading: cvLoading } = useCvData();
    const { items: portfolioItems, loading: portfolioLoading } =
        usePortfolioItems({ onlyPublished: true });

    const [isGenerating, setIsGenerating] = useState(false);

    const isDataReady = !cvLoading && !portfolioLoading && !!profileData;

    async function handleDownloadClick() {
        if (!isDataReady || isGenerating) {
            return;
        }

        setIsGenerating(true);

        try {
            await generateCvPdf(profileData, portfolioItems);
        } catch (error) {
            console.error("CV-PDF kon niet gegenereerd worden:", error);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <button
            type="button"
            className="cvExportButton"
            onClick={handleDownloadClick}
            disabled={isGenerating || !isDataReady}
        >
            {isGenerating ? "Generating CV..." : "Download my CV (PDF)"}
        </button>
    );
}

export default CvExportButton;
