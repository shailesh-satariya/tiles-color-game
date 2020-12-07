import {buildMessage, isNumber, ValidateBy} from "class-validator";

export class CreateGameDto {
  @Is2DNumberArray()
  grid: number[][];
}


/**
 * Checks if a given value is a 2d integer array.
 */
export function is2DNumberArray(grid: unknown): boolean {
  if (!Array.isArray(grid)) {
    return false;
  }

  let length = -1;
  for (const row of grid) {
    if (!Array.isArray(row) || (length !== -1 && row.length !== length)) {
      return false;
    } else if (length === -1) {
      length = row.length;
    }

    for (const num of row) {
      if (!isNumber(num)) {
        return false;
      }
    }
  }

  return true;
}


/**
 * Checks if value is a 2d integer array.
 */
export function Is2DNumberArray(): PropertyDecorator {
  return ValidateBy(
    {
      name: "is2DNumberArray",
      validator: {
        validate: (value): boolean => is2DNumberArray(value),
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + "$property must be a valid 2d integer array"
        ),
      },
    },
  );
}
