export const PagenationFun = (data: any, numItem: number, current: number) => {
  const homManyItems = numItem;
  const lastIndex = current * homManyItems;
  const firxtIndex = lastIndex - homManyItems;
  const dataList = data.slice(firxtIndex, lastIndex);
  const page = Math.ceil(data.length / homManyItems);
  const numbers = [...Array(page + 1).keys()].slice(1);

  return {
    datas: dataList,
    pages: numbers,
  };
};
