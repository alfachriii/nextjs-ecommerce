
interface Props {
    errors: string[] | string | undefined;
}

const FormErrorMessages = ({ errors }: Props) => {
    if(!errors) return null;

    if(errors.length > 1 && typeof errors == "object") {
        return (
            <div className="text-red-500 text-sm">
              <p>Password must:</p>
              <ul>
                {errors.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
        )
    }

    return (
      <p className="text-red-500 text-sm">{errors}</p>
    )
}

export default FormErrorMessages