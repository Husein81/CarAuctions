// global imports
import React from "react";

// local imports
import { Shad } from "./ui";
import Icon from "./icon";

type ToggleOption = {
  value: string;
  label: string;
  icon?: string;
  className?: string;
};

type SingleProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: "single";
};

type MultipleProps = {
  options: ToggleOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  type: "multiple";
};

function ToggleGroup(props: SingleProps): React.ReactElement;
function ToggleGroup(props: MultipleProps): React.ReactElement;

function ToggleGroup(props: SingleProps | MultipleProps) {
  const { options, className = "" } = props;
  const type = props.type ?? "single";

  if (type === "multiple") {
    return (
      <Shad.ToggleGroup
        className={className}
        type="multiple"
        value={props.value as string[]}
        onValueChange={(v: string[]) => {
          if (v) (props as MultipleProps).onChange(v);
        }}
      >
        {options.map((opt) => (
          <Shad.ToggleGroupItem
            key={opt.value}
            value={opt.value}
            className={opt.className}
          >
            {opt.icon && <Icon name={opt.icon} size={12} className="mr-2" />}
            {opt.label}
          </Shad.ToggleGroupItem>
        ))}
      </Shad.ToggleGroup>
    );
  }

  return (
    <Shad.ToggleGroup
      className={className}
      type="single"
      value={props.value as string}
      onValueChange={(v: string) => {
        if (v) (props as SingleProps).onChange(v);
      }}
    >
      {options.map((opt) => (
        <Shad.ToggleGroupItem
          key={opt.value}
          value={opt.value}
          className={opt.className}
        >
          {opt.icon && <Icon name={opt.icon} size={12} className="mr-2" />}
          {opt.label}
        </Shad.ToggleGroupItem>
      ))}
    </Shad.ToggleGroup>
  );
}

export default ToggleGroup;
