import React from "react";
import {
  Flex,
  TextField,
  Item,
  ListView,
  LabeledValue,
} from "@adobe/react-spectrum";

interface Item {
  id: string;
  name: string;
}

interface MultiSelectProps {
  items: Item[];
  label: string;
  selectedIds: string[];
  onSelectionChange: (strings: string[]) => void;
}

export const MultiSelect = (props: MultiSelectProps) => {
  const { items, label, selectedIds, onSelectionChange } = props;
  const [nameFilter, setNameFilter] = React.useState("");
  return (
    <Flex direction="column">
      <LabeledValue label={label} value="" />
      <ListView
        selectionMode="multiple"
        aria-label="Participants"
        minWidth="200px"
        height="200px"
        marginTop="4px"
        marginBottom="16px"
        selectedKeys={selectedIds.length > 0 ? selectedIds : undefined}
        onSelectionChange={(keys) => {
          if (typeof keys === "string") return;
          onSelectionChange(Array.from(keys) as string[]);
        }}
      >
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .map((item) => {
            return <Item key={item.id}>{item.name}</Item>;
          })}
      </ListView>
      <TextField
        aria-label="Filter names..."
        placeholder="Filter names..."
        value={nameFilter}
        onChange={setNameFilter}
      />
    </Flex>
  );
};
