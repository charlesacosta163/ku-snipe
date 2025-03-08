"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User } from "lucide-react";
import Form from "next/form";
import { watchCourse } from "@/lib/actions";
import { WatchCourseForm } from "./watch-course-form";

const CourseSectionItem = ({
  term,
  sections,
  userId
}: {
  term: string;
  sections: any[],
  userId: string
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="shadow px-4 rounded-[20px] border-l-4 border-l-blue-600"
      >
        <AccordionTrigger className="font-semibold text-xl">
          {term}
        </AccordionTrigger>

        <AccordionContent className="grid grid-cols-1 gap-4 mt-4">
          {sections.map((e, index) => {
            const [availableSeats, totalSeats] = e.seats
              .split(" / ")
              .map((e: string) => Number(e));

            return (
              <React.Fragment key={index}>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="font-bold text-gray-700 text-lg">
                      {e.name}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span className="text-gray-500 text-sm font-medium">
                      {availableSeats}/{totalSeats} seats available
                    </span>

                    {availableSeats <= 0? (
                      <WatchCourseForm 
                        courseCode={e.name} 
                        professor={e.professor} 
                        seats={e.seats} 
                        term={term} 
                        userId={userId}
                      />

                    ) : (<button
                      className="button bg-[#0095fd] text-white disabled:invisible"
                      disabled
                    >
                      Watch
                    </button>)}
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <div id="info" className="flex flex-col gap-4">
                    <div className="flex gap-2 text-sm font-medium">
                      <User height={20} />
                      <span className="self-end">{e.professor}</span>
                    </div>
                  </div>

                  {availableSeats < 1 ? (
                    <div>
                      <span className="px-3 py-1 rounded-full bg-red-500 text-white font-bold text-xs m-auto">
                        Closed
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="px-3 py-1 rounded-full bg-green-500 text-white font-bold text-xs m-auto">
                        Open
                      </span>
                    </div>
                  )}
                </div>

                <hr />
              </React.Fragment>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseSectionItem;
