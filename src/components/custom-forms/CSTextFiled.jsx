import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
// import { TextField } from '@mui/material';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({
  name,
  label,
  placeholder,
  description,
  helperText,
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log(field, error);
        return (
          <FormItem>
            <Label className={cn(error && "text-red-500 dark:text-red-900")}>
              {label}
            </Label>
            <FormControl>
              <Input value={field.value} placeholder={placeholder} {...field} className="text-sm h-8" />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />

            {error && (
              <p
                className={"text-sm font-medium text-red-500 dark:text-red-900"}
              >
                {error ? error?.message : helperText}
              </p>
            )}
          </FormItem>
        );
      }}
    />
  );
}
