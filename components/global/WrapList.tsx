interface IWrapList {
  children?: string | JSX.Element | JSX.Element[];
  list?: string;
}
  
export const WrapList = ({
  children,
  list = "list-decimal"
}: IWrapList) => {
  return (
    <ol className={`${list} mt-4 space-y-4`}>
      {children}
    </ol>
  )
}