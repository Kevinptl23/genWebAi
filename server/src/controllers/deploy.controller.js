import fetch from "node-fetch";
import Website from "../models/website.model.js";

export const deployWebsite = async (req, res) => {
  try {
    const { websiteId } = req.body;

    const website = await Website.findById(websiteId);

    if (website?.deployed) {
      return res.json({
        success: true,
        url: website.deployUrl,
      });
    }

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    const htmlFile = website.latestCode;

    const response = await fetch(
      "https://api.vercel.com/v13/deployments?skipAutoDetectionConfirmation=1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `genweb-${websiteId}`,

          projectSettings: {
            framework: null,
            buildCommand: null,
            devCommand: null,
            installCommand: null,
            outputDirectory: null,
            rootDirectory: null,
          },

          files: [
            {
              file: "index.html",
              data: htmlFile,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    console.log("Data: ", data);

    const deployUrl = `https://${data.url}`;

    await Website.findByIdAndUpdate(websiteId, {
      deployUrl,
      deployed: true,
    });

    res.json({
      success: true,
      url: deployUrl,
    });
  } catch (error) {
    console.log("Deploy Error:", error);
    res.status(500).json({ error: "Deployment failed" });
  }
};
