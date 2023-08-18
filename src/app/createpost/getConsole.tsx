"use server";
export const getConsole = async (data: FormData) => {
  const dataArray = [...data.entries()];
  console.log(dataArray);

  // for (const pair of data.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }
};
