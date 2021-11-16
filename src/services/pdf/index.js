import PdfPrinter from "pdfmake";
import striptags from "striptags";
import axios from "axios";

const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

const printer = new PdfPrinter(fonts);

export const generateUserPDF = async (user) => {
  let imagePart = {};
  if (user.image) {
    const image = await axios.get(user.image, { responseType: "arraybuffer" });
    const userImageURLParts = user.image.split("/");
    const userImageName = userImageURLParts[userImageURLParts.length - 1];
    const [id, extension] = userImageName.split(".");
    const base64 = image.data.toString("base64");
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, fit: [100, 100] };
  }

  const docDefinition = {
    content: [
      {
        text: "User Details",
        style: "header",
      },
      {
        text: "Name : " + user.name,
        style: "normal",
      },
      {
        text: "Surname : " + user.surname,
        style: "normal",
      },
      {
        text: "Username : " + user.username,
        style: "normal",
      },
      {
        text: "Email : " + user.email,
        style: "normal",
      },
      {
        text: "Bio : " + user.bio,
        style: "normal",
      },
      {
        text: "Image : " + user.image,
        style: "normal",
      },
      {
        text:
          "Experience : " +
          user.experience.map((exp) => {
            return (
              "Working as " +
              exp.role +
              " at " +
              exp.company +
              " from " +
              exp.startDate +
              " to " +
              exp.endDate +
              "in the area of " +
              exp.area +
              "doing" +
              exp.description
            );
          }),
      },
      {
        text:
          "Education : " +
          user.education.map((edu) => {
            return (
              "Studied at " +
              edu.school +
              " from " +
              edu.startDate +
              " to " +
              edu.endDate +
              "doing" +
              edu.description +
              "having activities like " +
              edu.activities +
              "in the field of studies" +
              edu.fieldOfStudy
            );
          }),
      },
      {
        text: "Created At : " + user.createdAt,
        style: "normal",
      },
      {
        text: "Updated At : " + user.updatedAt,
        style: "normal",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        margin: [0, 0, 0, 10],
      },
      normal: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, {});
  return pdfDoc;
};
