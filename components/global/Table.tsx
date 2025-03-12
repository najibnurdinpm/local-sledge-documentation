import { useState } from "react";

interface ITable {
  data: {
    thead: {
      title: string | JSX.Element | JSX.Element[];
    }[];
    tbody: string[] | JSX.Element[];
  };
  className?: string;
  overflow?: boolean;
  dropdownTrigger?: {
    text?: string | JSX.Element | JSX.Element[];
    trigger?: string | JSX.Element | JSX.Element[];
  };
}

export function Table({ data, className, overflow, dropdownTrigger }: ITable) {
  const { thead, tbody } = data;
  const [isOpen, setOpen] = useState(!dropdownTrigger || false);

  return (
    <>
      {dropdownTrigger && (
        <div className="flex gap-1">
          {dropdownTrigger.text}
          <div className="cursor-pointer" onClick={() => setOpen(!isOpen)}>
            {dropdownTrigger.trigger}
          </div>
        </div>
      )}
      <table
        className={`${className} ${
          (overflow && "!max-w-fit !block !overflow-scroll") ||
          (!isOpen && "!hidden")
        } mt-6 divide-y divide-gray-700 overflow-auto md:overflow-hidden block md:table max-w-fit whitespace-nowrap md:whitespace-normal`}
      >
        <thead>
          <tr>
            {thead.map((v, i) => (
              <th
                key={"th-" + i}
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left"
              >
                {v.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-700">
          {tbody.map((v, it) => (
            <tr key={"tr-" + it}>
              {v.map((x, ib) => {
                let classes;

                switch (ib) {
                  case 0:
                    classes =
                      "bg-[linear-gradient(161deg,_#43c6ac_0%,_#f8ffae_100%)] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";
                    break;
                  case 1:
                    classes = "text-gray-3";
                    break;
                  default:
                    break;
                }
                return (
                  <td
                    key={"td-" + ib}
                    className={`px-4 py-4 text-sm font-medium md:whitespace-pre ${classes}`}
                  >
                    {String(x).includes("`") ? x.split("`")[1] : x}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
