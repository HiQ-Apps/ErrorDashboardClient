import { type FormEvent, useEffect } from "react"
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";

import { UpdateIcon } from "@radix-ui/react-icons";
import { useForgotPasswordMutation} from "features/userApiSlice";
import { type EmailSchema, emailSchema } from "schemas/emailSchema"
import useForm from "hooks/useForm"


const EmailForm = () => {
  const { toast } = useToast();
  const { form, setForm, handleChange, validate, errors } = useForm<EmailSchema>({
    email: "",
  }, emailSchema)

  const [forgotPassword, {isSuccess, isLoading}] = useForgotPasswordMutation();

  const handleForgotPasswordClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
        try {
            await forgotPassword(form).unwrap();
            toast({
              title: `Forgot password request sent to email: ${form.email}`,
              description: `Please check your email for a link that will redirect you to reset your password.`
            })
        } catch (err) {
            console.error("Email not found:", err);
        }
    }
  }

    return (
    <form>
      <h1>Forgot Password?</h1>
      <h3>Please enter your email to get a reset link sent to the address.</h3>
      <div className="mb-4">
          <Label htmlFor="email" text="Email" />
          <Input
              id="email"
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}/>
          {errors.errorMessages.email && (
              <span className="text-error text-sm">
                  {errors.errorMessages.email}
              </span>
          )}
          <BaseButton
            onClick={handleForgotPasswordClick}
            variant="accent"
            overrideStyles="w-full"
            content={
              isSuccess ? (
                "Success"
              ) : isLoading ? (
                <UpdateIcon className="animate-ease-in-out-rotation" />
              ) : (
                "Send reset link"
              )
            }
          />
      </div>
    </form>)
}

export default EmailForm
