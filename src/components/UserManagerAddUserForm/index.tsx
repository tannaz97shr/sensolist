import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SelectInput from "../UI/SelectInput";
import { useFetchRolesQuery } from "@/lib/features/api/roleSlice";
import { ISelectOption, IUser } from "@/types/general";
import { useCreateUserMutation } from "@/lib/features/api/usersSlice";

interface UserManagerAddUserFormProps {
  closeModal: () => void;
  user: IUser | null;
}

interface IAddUserInputs {
  firstname: string;
  lastname: string;
  userRoles: string[]; // Ensure this is typed as an array
  password: string;
  phonenumber: string;
}

export default function UserManagerAddUserForm({
  closeModal,
  user,
}: UserManagerAddUserFormProps) {
  const { data: roles, error, isLoading } = useFetchRolesQuery();
  useEffect(() => {
   console.log(roles);
   
  }, [])
  
  const [createUser, { isLoading: isCreating, error: createError }] =
    useCreateUserMutation(); // Hook for API mutation

  const selectInputsRoleList =
    roles?.list?.map((item) => ({
      title: item.name,
      value: item.roleId,
    })) || [];

  const [selectedRole, setSelectedRole] = useState<ISelectOption | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors: formError },
  } = useForm<IAddUserInputs>();

  // Watch for the selected role and set it in the form state
  const handleRoleChange = (option: ISelectOption) => {
    setSelectedRole(option);
    setValue("userRoles", [option.value]); // Ensure it's an array
  };

  const onSubmit: SubmitHandler<IAddUserInputs> = async (data) => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      // Send the user creation request
      await createUser({
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        phonenumber: data.phonenumber,
        userRoles: [selectedRole.value], // Ensure it's an array
      }).unwrap(); // Ensure API call is awaited properly

      reset(); // Reset the form after successful submission
      closeModal(); // Close the modal after adding user
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>{!user ? "Add New User" : "Edit User"}</div>
      <Input
        required
        error={
          formError.firstname?.type === "required"
            ? "This field is required"
            : ""
        }
        label="First Name"
        register={register}
        name="firstname"
        className="mt-6"
      />
      <Input
        required
        error={
          formError.lastname?.type === "required"
            ? "This field is required"
            : ""
        }
        label="Last Name"
        register={register}
        name="lastname"
        className="mt-9"
      />
      <Input
        required
        error={
          formError.phonenumber?.type === "required"
            ? "This field is required"
            : ""
        }
        label="Phone Number"
        register={register}
        name="phonenumber"
        className="mt-9"
      />
      <Input
        required
        error={
          formError.password?.type === "required"
            ? "This field is required"
            : ""
        }
        label="Password"
        register={register}
        name="password"
        className="mt-9"
      />
      <SelectInput
        options={selectInputsRoleList ?? []}
        register={register}
        name="userRoles"
        selectedValue={selectedRole as any}
        setSelectedValue={handleRoleChange}
        label="User Roles"
        className="mt-9"
      />

      <div className="w-full flex items-center mt-10 gap-4">
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            reset();
            closeModal();
          }}
          className="w-[36%]"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button className="w-[64%] mx-auto" type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create"}
        </Button>
      </div>
      {createError && <p className="text-red-500">Error creating user.</p>}
    </form>
  );
}
