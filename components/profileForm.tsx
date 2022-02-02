import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Input from "./input";
import { Button } from './button/button.component';

type ProfileLink = {
  url: string;
  label: string;
};

type ISignUpInputs = {
  Name: string;
  Title: string;
  Pronouns: string;
  links: ProfileLink[];
};

interface Props {
  onSubmit: (data: ISignUpInputs) => void;
  profile: ISignUpInputs;
}

export default function ProfileForm({ onSubmit, profile }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ISignUpInputs>();
  const { fields, append, remove } = useFieldArray({
    name: "links",
    control,
  });

  console.log(watch("Name")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            label="Name"
            register={register}
            placeholder="Enter your name"
            type="text"
            required
          />
          {errors["Name"] && (
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Input
            label="Title"
            register={register}
            placeholder="ie. suavepainter"
            type="text"
          />
        </div>
        <div className="w-full px-3">
          <Input
            label="Pronouns"
            type="text"
            placeholder="ie. they/them"
            register={register}
          />
        </div>
        <div className="w-full px-3">
          <Input
            label="Location"
            type="text"
            placeholder="ie. Berlin, Shanghai, etc."
            register={register}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <h2>++Add Links++</h2>
        <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
          {fields.map((field, index) => (
            <div className="py-6 grid grid-cols-2" key={field.id}>
            {/* TODO: change these to Input component, add new "noLabel" prop to Input */}
              <input
                className="appearance-none col-span-2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                id="grid-website-url"
                type="text"
                placeholder="Enter your website"
                {...register(`links.${index}.url` as const)}
              />
              <input
                className="appearance-none col-span-1 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-website-label"
                type="text"
                placeholder="Label"
                {...register(`links.${index}.label` as const)}
              />
              <button
                className="col-span-1 uppercase"
                onClick={() => remove(index)}>
                - Remove
              </button>
            </div>
          ))}
          <button
            className="uppercase"
            onClick={() =>
              append({ url: "", label: "" }, { shouldFocus: true })
            }>
            + Add
          </button>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <h2>++Upload Work++</h2>
        <p className="text-red-500 text-xs italic">
              TODO: Upload component & flow
            </p>
        <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
          <div className="py-6 grid grid-cols-2">
            {[...Array(6).keys()].map((key) => (
              <div className={`cols-span-${key}`}>
                <button
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-dashed rounded-full p-10 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={`grid-upload-work-${key}`}
                  onClick={() => console.log("redirect to /upload")}></button>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`grid-upload-work-${key}`}>
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button role="submit">
        Save Changes
      </Button>
    </form>
  );
}
