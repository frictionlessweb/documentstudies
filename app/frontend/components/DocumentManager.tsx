import React from "react"
import { MultiSelect } from '@/components/MultiSelect';

export const DocumentManager = () => {
  return (
    <MultiSelect
      items={[]}
      label="Documents"
      onSelectionChange={() => {}}
      selectedIds={[]}
    />
  );
};
