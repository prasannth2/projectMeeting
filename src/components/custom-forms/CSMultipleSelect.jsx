import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

// Generate state options using faker
// const addressDefinitions = faker.definitions.address;

// ----------------------------------------------------------------------

CSMultipleSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.any,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  helperText: PropTypes.node,
};

export default function CSMultipleSelect({
  name,
  label,
  helperText,
  options,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log(field, error);
        return (
          <div className="my-2">
            <Label className={cn(error && "text-red-500 dark:text-red-900")}>
              {label}
            </Label>
            <Autocomplete
              {...field}
              multiple
              disableCloseOnSelect
              id="size-small-standard-multi"
              size="small"
              options={options}
              onChange={(event, newValue) => {
                console.log(newValue);
                // setValue(name, newValue[0]._id);
                setValue(name, newValue, { shouldValidate: true });
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  className="h-10"
                  placeholder="Favorites"
                />
              )}
              {...other}
            />
            {error && (
              <p
                className={"text-sm font-medium text-red-500 dark:text-red-900"}
              >
                {error ? error?.message : helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
