"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleAlert, CircleSmall, GitBranchPlus } from "lucide-react";
import { ALL_VERSIONS } from "@/lib/constants";

const UnderConstructionButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GitBranchPlus className="w-5 h-5 cursor-pointer animate-bounce text-blue-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>KU Watch Version Logs</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {ALL_VERSIONS.map((version) => (
            <div key={version.id} className="mb-4">
              <header className="px-4 py-2 rounded-lg bg-[#2A3370] text-white">
                <p className="text-sm font-semibold text-center">
                  {version.status} v{version.name} {version.tag} {version.id === ALL_VERSIONS.length ? "(Current)" : ""}
                </p>
              </header>

              <ul className="text-sm mt-2 space-y-1 pl-1">
                {version.fixes.map((fix, index) => {
                  if (typeof fix === 'object' && fix !== null && 'feature' in fix) {
                    return (
                      <li key={`feature-${index}`} className="mb-2">
                        <div className="flex items-center gap-2 font-bold">
                          <CircleSmall className="w-4 h-4 flex-shrink-0" />
                          <span>{fix.feature}</span>
                        </div>
                        
                        {fix.fixes && Array.isArray(fix.fixes) && (
                          <ul className="pl-6 mt-1 space-y-1">
                            {fix.fixes.map((subFix, subIndex) => (
                              <li key={`subfix-${index}-${subIndex}`} className="flex items-center gap-2 text-gray-600">
                                <CircleSmall className="w-4 h-4 flex-shrink-0" />
                                <span>{subFix}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  } else {
                    return (
                      <li key={`fix-${index}`} className="flex items-center gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0" />
                        <span>{fix}</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnderConstructionButton;
