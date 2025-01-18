import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit }) {
  const { id: cabinId, ...editValues } = cabinToEdit;
  const isEditing = Boolean(cabinId);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm(
    isEditing && { defaultValues: editValues }
  );
  const { errors } = formState;

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({ querykey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      // toast.error(err.message);
    },
  });

  const { mutate: editCabin, isLoading: isEditingData } = useMutation({
    mutationFn: ({ editcabinData, id }) => createEditCabin(editcabinData, id),
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({ querykey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      // toast.error(err.message);
    },
  });

  const isWaiting = isCreating || isEditingData;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditing)
      editCabin({ editcabinData: { ...data, image }, id: cabinId });
    else createCabin({ ...data, image });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="cabin Name"
        error={errors?.name?.message}
        disabled={isWaiting}
      >
        <Input
          type="text"
          id="name"
          {...register("name", { required: "name is required" })}
        />
      </FormRow>

      <FormRow
        label="maxCapacity"
        error={errors?.maxCapacity?.message}
        disabled={isWaiting}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "Minimum capacity is 1" })}
        />
      </FormRow>
      <FormRow
        label="regularPrice"
        error={errors?.regularPrice?.message}
        disabled={isWaiting}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "Minimum price is 1" })}
        />
      </FormRow>
      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        disabled={isWaiting}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "discount is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount can't be more than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="description"
        error={errors?.description?.message}
        disabled={isWaiting}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "description   is required",
          })}
        />
      </FormRow>

      <FormRow label="Image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWaiting}>
          {isEditing ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
