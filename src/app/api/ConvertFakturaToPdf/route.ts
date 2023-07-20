import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    const { nazwa, wartosc_netto, wartosc_brutto, vat } = (await req.json()) as {
      nazwa: string;
      wartosc_netto: string;
      wartosc_brutto: string;
      vat: string;
    };
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const textOptions = {
      font,
      size: fontSize,
    };
    const x = 50;
    let y = page.getSize().height - 50;
    const lineHeight = fontSize * 1.5;

    page.drawText(`Nazwa: ${nazwa}`, {
      ...textOptions,
      x,
      y,
      lineHeight,
    });
    y -= lineHeight;
    page.drawText(`Wartosc brutto: ${parseFloat(wartosc_netto) * 1.23 }`, {
      ...textOptions,
      x,
      y,
      lineHeight,
    });
    y -= lineHeight;
    page.drawText(`Wartosc netto: ${wartosc_netto}`, {
      ...textOptions,
      x,
      y,
      lineHeight,
    });
    y -= lineHeight;
    page.drawText(`Podatek VAT: ${vat}`, {
      ...textOptions,
      x,
      y,
      lineHeight,
    });
    const pdfBytes = await pdfDoc.save();

    const response = new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=faktura.pdf",
      },
      status: 200,
    });

    return response;
  } catch (error:any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Error converting Faktura to PDF: " + error.message,
      }),
      { status: 500 }
    );
  }
}
