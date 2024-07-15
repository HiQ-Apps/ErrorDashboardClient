import { type FormEvent, type MouseEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  UpdateIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";

import { useModalHandlerContext } from "shared/context/modalHandlerContext";
import { openModal, closeModal, setIsLoading } from "features/modalSlice";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "features/userApiSlice";
import { useVerifyUserMutation } from "features/userApiSlice";
import { Input, Label, BaseButton, Avatar } from "components/base";
import { ConfirmationModal } from "components/composite";
import {
  updateUserProfileSchema,
  type UpdateUserProfileSchema,
} from "schemas/updateUserProfileSchema";
import { useToast } from "components/ui/use-toast";
import {
  selectUserProfile,
  selectUser,
  setProfile,
  setUser,
} from "features/authSlice";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { formatHeader } from "shared/utils/parseString";
import useForm from "hooks/useForm";
import ColorSelector from "components/composite/ColorSelector/ColorSelector";
import { generateUUID } from "shared/utils/generateUUID";
import { VerifyUserRequest } from "types/User";

export const UpdateUserProfileForm = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const { registerHandler, unregisterHandler } = useModalHandlerContext();

  if (!id) {
    throw new Error("User ID is required");
  }

  if (!user) {
    throw new Error("User is required");
  }

  if (!userProfile) {
    throw new Error("User Profile is required");
  }

  const [verifyUser] = useVerifyUserMutation();
  const { data: initialUserProfile } = useGetUserProfileQuery(id);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [passVisible, setPassVisible] = useState(false);
  const [avatarColor, setAvatarColor] = useState(userProfile.avatarColor);
  const { form, handleChange, setForm, validate, errors } =
    useForm<UpdateUserProfileSchema>(
      {
        id: null,
        firstName: null,
        lastName: null,
        avatarColor: null,
        username: null,
        password: null,
      },
      updateUserProfileSchema
    );

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      avatarColor: avatarColor,
    }));
  }, [avatarColor]);

  useEffect(() => {
    if (initialUserProfile) {
      setForm({
        ...form,
        id: user.id,
        firstName: initialUserProfile.firstName,
        lastName: initialUserProfile.lastName,
        avatarColor: initialUserProfile.avatarColor,
        username: user.username,
      });
    }
  }, [initialUserProfile]);

  const handleSubmitWithConfirmation = async (
    event: FormEvent,
    fieldName: keyof UpdateUserProfileSchema
  ) => {
    event.preventDefault();
    registerHandler(
      async (password: VerifyUserRequest) => {
        try {
          dispatch(setIsLoading(true));
          await verifyUser(password).unwrap();
          if (validate()) {
            const value = form[fieldName];
            await updateUserProfile({
              id,
              [fieldName]: value,
            }).unwrap();
            dispatch(setIsLoading(false));
            unregisterHandler();
            dispatch(closeModal());
            toast({
              title: "Profile Updated",
              description: `${formatHeader(
                fieldName
              )} has been updated successfully`,
            });
          } else {
            toast({
              title: "Profile Update Failed",
              description: "Please try again",
            });
          }
        } catch (error) {
          dispatch(setIsLoading(false));
          dispatch(closeModal());
          toast({
            title: "Profile Update Failed",
            description: "Please try again",
          });
        }
      },
      () => {
        console.error("Action rejected");
        dispatch(closeModal());
      }
    );
    dispatch(openModal({ modalType: "confirmation" }));
  };

  const handleSubmit = async (
    event: FormEvent,
    fieldName: keyof UpdateUserProfileSchema
  ) => {
    event.preventDefault();
    try {
      if (validate()) {
        const value = form[fieldName];
        const updatedUserProfile = await updateUserProfile({
          id,
          [fieldName]: value,
        }).unwrap();
        toast({
          title: "Profile Updated",
          description: `${formatHeader(
            fieldName
          )} has been updated successfully`,
        });
        if (updatedUserProfile) {
          dispatch(
            setProfile({
              ...userProfile,
              firstName: updatedUserProfile.firstName,
              lastName: updatedUserProfile.lastName,
              avatarColor: updatedUserProfile.avatarColor,
            })
          );
        }
        if (fieldName === "username") {
          dispatch(setUser({ ...user, username: form.username as string }));
        }
      } else {
        toast({
          title: "Profile Update Failed",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        title: "Profile Update Failed",
        description: "Please try again",
      });
    }
  };

  const togglePassVisibility = () => {
    setPassVisible(!passVisible);
  };

  const handleGenerateUUID = (
    event: MouseEvent<HTMLDivElement, Event>,
    fieldName: keyof UpdateUserProfileSchema
  ) => {
    event.preventDefault();
    const newUUID = generateUUID();
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: newUUID,
    }));
  };

  const copyToClipboard = (
    event: MouseEvent<HTMLDivElement, Event>,
    fieldName: keyof UpdateUserProfileSchema
  ) => {
    event.preventDefault();
    const fieldValue = form[fieldName] || "";
    navigator.clipboard
      .writeText(fieldValue as string)
      .then(() => {
        toast({
          title: `${formatHeader(fieldName)} copied to clipboard`,
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-left">
      <Avatar name={user.username} size="lg" avatarColor={avatarColor} />
      <form className="grid grid-cols-1 gap-6 place-items-center max-w-2xl mx-auto mt-8">
        <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-left">
          <Label htmlFor="password" text="Change Password:" />
          <div className="relative col-span-3 flex items-center space-x-2">
            <Input
              type={passVisible ? "text" : "password"}
              name="password"
              value={form.password || ""}
              onChange={handleChange}
            />
            {errors.errorMessages.password && (
              <span className="text-error text-sm">
                {errors.errorMessages.password}
              </span>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                  onClick={(e) => copyToClipboard(e, "password")}
                >
                  <ClipboardCopyIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                  onClick={(e) => handleGenerateUUID(e, "password")}
                >
                  <UpdateIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate new UUID</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                  onClick={togglePassVisibility}
                >
                  {passVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle visibility</p>
              </TooltipContent>
            </Tooltip>
            <BaseButton
              size="sm"
              content="Update"
              variant="default"
              onClick={(e) => handleSubmitWithConfirmation(e, "password")}
              overrideStyles="my-4"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-left">
          <Label htmlFor="username" text="New Username:" />
          <div className="relative col-span-3 flex items-center space-x-2">
            <Input
              type="text"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
            />
            {errors.errorMessages.username && (
              <span className="text-error text-sm">
                {errors.errorMessages.username}
              </span>
            )}
            <BaseButton
              size="sm"
              content="Update"
              variant="default"
              onClick={(e) => handleSubmit(e, "username")}
              overrideStyles="my-4"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-left">
          <Label htmlFor="firstName" text="First Name:" />
          <div className="relative col-span-3 flex items-center space-x-2">
            <Input
              type="text"
              name="firstName"
              value={form.firstName || ""}
              onChange={handleChange}
            />
            {errors.errorMessages.firstName && (
              <span className="text-error text-sm">
                {errors.errorMessages.firstName}
              </span>
            )}
            <BaseButton
              size="sm"
              content="Update"
              variant="default"
              onClick={(e) => handleSubmit(e, "firstName")}
              overrideStyles="my-4"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-left">
          <Label htmlFor="lastName" text="Last Name:" />
          <div className="relative col-span-3 flex items-center space-x-2">
            <Input
              type="text"
              name="lastName"
              value={form.lastName || ""}
              onChange={handleChange}
            />
            {errors.errorMessages.lastName && (
              <span className="text-error text-sm">
                {errors.errorMessages.lastName}
              </span>
            )}
            <BaseButton
              size="sm"
              content="Update"
              variant="default"
              onClick={(e) => handleSubmit(e, "lastName")}
              overrideStyles="my-4"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
          <Label htmlFor="avatarColor" text="Select an Avatar Color:" />
          <div className="relative col-span-3 flex items-center space-x-2">
            <ColorSelector
              selectedColor={avatarColor}
              setColor={setAvatarColor}
            />
            <BaseButton
              size="sm"
              content="Update"
              variant="default"
              onClick={(e) => handleSubmit(e, "avatarColor")}
              overrideStyles="my-4"
            />
          </div>
        </div>
      </form>
      <ConfirmationModal />
    </div>
  );
};
