import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../UI/Button";
import Input from "../UI/Input";

interface IAddRoleInputs {
  name: string;
  description: string;
}

interface UserManagerAddRoleFormProps {
  addRole: (name: string, description: string) => void;
  closeModal: () => void;
}

export default function UserManagerAddRoleForm({
  addRole,
  closeModal,
}: UserManagerAddRoleFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IAddRoleInputs>();

  const onSubmit: SubmitHandler<IAddRoleInputs> = (data) => {
    addRole(data.name, data.description);
    reset();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Add New Role</div>
      <Input
        required
        error={errors.name?.type === "required" ? "This field is required" : ""}
        label="Name"
        register={register}
        name="name"
        className="mt-6"
      />
      <Input
        required
        error={
          errors.description?.type === "required"
            ? "This field is required"
            : ""
        }
        label="Description"
        register={register}
        name="description"
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
        <Button className="w-[64%] mx-auto" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}
