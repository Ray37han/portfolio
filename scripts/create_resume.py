from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUTPUT = "public/rakibul-hasan-rayhan-resume.pdf"


def text(value: str) -> str:
    return value.replace("&", "&amp;")


def section(title, body, styles):
    return [
        Spacer(1, 4 * mm),
        Paragraph(title.upper(), styles["section"]),
        HRFlowable(width="100%", thickness=0.55, color=colors.HexColor("#C7A05C"), spaceBefore=2, spaceAfter=6),
        body,
    ]


def project(name, label, summary, stack, styles):
    return KeepTogether([
        Paragraph(f"<b>{text(name)}</b> <font color='#B98135'>| {text(label)}</font>", styles["project_title"]),
        Paragraph(text(summary), styles["body"]),
        Paragraph(f"<font color='#756D63'>Stack:</font> {text(stack)}", styles["small"]),
        Spacer(1, 3.5 * mm),
    ])


def build():
    document = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=13 * mm,
        title="Rakibul Hasan Rayhan Resume",
        author="Rakibul Hasan Rayhan",
    )
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=colors.HexColor("#171512")))
    styles.add(ParagraphStyle(name="role", parent=styles["Normal"], fontName="Helvetica", fontSize=10.5, leading=14, textColor=colors.HexColor("#9B6B2C"), spaceAfter=4))
    styles.add(ParagraphStyle(name="contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=colors.HexColor("#5E5851"), alignment=TA_RIGHT))
    styles.add(ParagraphStyle(name="section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=10, textColor=colors.HexColor("#9B6B2C"), tracking=1.6))
    styles.add(ParagraphStyle(name="body", parent=styles["Normal"], fontName="Helvetica", fontSize=9.1, leading=13.3, textColor=colors.HexColor("#34312D")))
    styles.add(ParagraphStyle(name="small", parent=styles["Normal"], fontName="Helvetica", fontSize=8.2, leading=11.5, textColor=colors.HexColor("#4D4842")))
    styles.add(ParagraphStyle(name="project_title", parent=styles["Normal"], fontName="Helvetica", fontSize=9.6, leading=13, textColor=colors.HexColor("#24211D"), spaceAfter=1.7 * mm))

    header = Table([
        [Paragraph("Rakibul Hasan Rayhan", styles["name"]), Paragraph("Rajshahi, Bangladesh<br/>rakibulrayhan63@gmail.com<br/>+880 1313 285163<br/>github.com/Ray37han<br/>linkedin.com/in/rakibul-hasan-rayhan", styles["contact"])],
        [Paragraph("Full-stack Developer | CSE Student at RUET", styles["role"]), ""],
    ], colWidths=[112 * mm, 64 * mm])
    header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))

    story = [header]
    story += section("Profile", Paragraph("Full-stack developer and Computer Science &amp; Engineering student at Rajshahi University of Engineering &amp; Technology. I build practical web and mobile products across interface, API, authentication, and data layers, with a focus on thoughtful user experience and reliable delivery.", styles["body"]), styles)
    experience = [
        project("Vybebd.store", "MERN E-commerce", "Built a full-stack commerce platform. Worked through React SEO constraints with a client-side rendering strategy, deliberate metadata handling, and deployment-aware architecture.", "MongoDB, Express, React, Node.js, SEO", styles),
        project("rhrayhan.dev", "Personal Brand", "Designed and built an editorial developer portfolio that presents technical work, product thinking, and a clear route to contact.", "Design Systems, Responsive UI, JavaScript", styles),
        project("E-commerce Flutter App", "Mobile", "Built a cross-platform commerce application translating familiar product and shopping flows into a touch-first mobile experience.", "Flutter, Mobile UI, E-commerce", styles),
        project("LinguaFlow", "University Software Engineering", "Contributed to a spaced-repetition vocabulary product with team documentation, MVP diagrams, personas, and individual reflections.", "Product Documentation, Team Delivery, MVP", styles),
    ]
    story += [
        Spacer(1, 4 * mm),
        Paragraph("SELECTED PROJECTS", styles["section"]),
        HRFlowable(width="100%", thickness=0.55, color=colors.HexColor("#C7A05C"), spaceBefore=2, spaceAfter=6),
        *experience,
    ]
    skills = "Languages: C, C++, Java, Python | Web: HTML, CSS, JavaScript, React, Node.js, Express, REST APIs | Data: MongoDB, PostgreSQL, Mongoose, Prisma, Drizzle, NeonDB | State: Redux, Redux Toolkit, Zustand | Mobile &amp; AI: Flutter, TensorFlow.js, LangChain | Authentication: JWT"
    story += section("Technical Skills", Paragraph(skills, styles["body"]), styles)
    story += section("Education", Paragraph("<b>B.Sc. in Computer Science &amp; Engineering</b><br/>Rajshahi University of Engineering &amp; Technology (RUET), Rajshahi, Bangladesh", styles["body"]), styles)
    story += section("Interests", Paragraph("Full-stack product development, open-source collaboration, AI-assisted development, mobile product design, and internships where I can learn through shipping useful software.", styles["body"]), styles)
    document.build(story)


if __name__ == "__main__":
    build()
