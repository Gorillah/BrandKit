import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const questions = [
  {
    item: 1,
    question: "How does the AI-powered logo generator work?",
    answer:
      "Our AI-powered logo generator uses advanced algorithms and design principles to create unique and professional logos based on the preferences and inputs you provide, such as company name, industry, and style preferences.",
  },
  {
    item: 2,
    question: "Are the logos created by the AI unique?",
    answer:
      "Yes, our AI is designed to generate unique logos for each user. However, as with any design tool, it's essential to ensure your final logo doesn't inadvertently resemble existing trademarks.",
  },
  {
    item: 3,
    question: "Can I use the logos for commercial purposes?",
    answer:
      "Yes, logos generated under our Pro and Enterprise tiers come with a commercial use license, allowing you to use them for business branding, merchandise, advertising, and more.",
  },
  {
    item: 4,
    question: "How much does it cost to generate a logo?",
    answer:
      "We offer different subscription tiers to cater to various needs. Please refer to our pricing page for detailed information.",
  },
  {
    item: 5,
    question: "Do I need any design experience to use this tool?",
    answer:
      "Not at all! Our AI-powered logo generator is user-friendly and designed for both design novices and professionals.",
  },
  {
    item: 6,
    question: "What if I'm not satisfied with the generated logo?",
    answer:
      "We aim for 100% customer satisfaction. If you're not happy with the generated logo, you can either make revisions or contact our support team for further assistance.",
  },
];

export default function Qna() {
  return (
    <div className="container text-3xl flex flex-col gap-4" id="faq">
      <h3 className="text-center font-semibold">Questions and Answers</h3>
      {questions.map((question, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem value={cn("item-" + index)}>
            <AccordionTrigger className="text-lg text-left">{question.question}</AccordionTrigger>
            <AccordionContent className="text-lg">{question.answer}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
