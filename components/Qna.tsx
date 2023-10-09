import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const questions = [
  {
    item: 1,
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    item: 2,
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    item: 2,
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
];

export default function Qna() {
  return (
    <div className="container text-2xl flex flex-col gap-4" id="faq">
      <h3 className="text-center font-semibold">Questions and Answers</h3>
      {questions.map((question, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem value={cn("item-" + index)}>
            <AccordionTrigger>{question.question}</AccordionTrigger>
            <AccordionContent className="text-lg">
              {question.answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
