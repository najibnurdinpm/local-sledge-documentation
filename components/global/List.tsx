import Image from "next/image";

interface IList {
  title?:string; 
  imgSrc?: string;
  children?: string | JSX.Element | JSX.Element[];
  whosChildren?: string;
}

const ListLi = ({children}) => {

  return (
    <li className="space-y-4">
        {children}
    </li>
  )
}
    
  export const List = ({
    title,
    imgSrc,
    children,
    whosChildren = "image",
  }: IList) => {
    return (

        whosChildren === "image" ? (
            <ListLi>
            {title && (
                <div>
                    {title}
                </div>
            )}
            {imgSrc && (
                <>
                
                    <Image
                        src={imgSrc}
                        alt="Badge Header Menu"
                        width="1391"
                        height="646"
                    />
                    {children}
                </>
            )}
            
        </ListLi>
        ) : (
            <ListLi>
            {title && (
                <>
                    <div>
                        {title}
                    </div>
                    {children}
                </>
            )}
            {imgSrc && (
                <>
                
                    <Image
                        src={imgSrc}
                        alt="Badge Header Menu"
                        width="1391"
                        height="646"
                    />
                </>
            )}
            
        </ListLi>
        )
        
        
    )
  }