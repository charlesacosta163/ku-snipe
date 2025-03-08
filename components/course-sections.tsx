import React from "react";
import CourseSectionItem from "./course-section-item";

const CourseSections = ({data, userId}: {data: any, userId: string}) => {
  return (
    <section>
      <h1 className="font-bold text-[1.5rem]">Available Sections:</h1>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {
          data.map((e: any, index: number) => {
            return (
              <CourseSectionItem 
                key={index}
                term={e.term}
                sections={e.sections}
                userId={userId}
              />
            )
          })
        }
      </div>
    </section>
  );
};

export default CourseSections;
