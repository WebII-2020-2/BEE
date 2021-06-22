const getTotalValue = (data) => {
  const totalValue = data.reduce((x, v) => x + v.value, 0);
  return totalValue;
};

const getTotalProducts = (data) => {
  const totalproducts = data.reduce((x, v) => x + v.products, 0);
  return totalproducts;
};

const getBlankData = (month) => {
  const oddMonths = [4, 6, 9, 11];
  let days;

  if (month === 2) {
    days = 29;
  } else if (oddMonths.find((m) => m === month)) {
    days = 31;
  } else {
    days = 32;
  }

  const data = [...Array(days)];

  const blankData = data.map((d, i) => ({
    produtos: 0,
    valor: 0.0,
    dia: `${i}`,
  }));
  return blankData;
};

const getGraphData = (data, date) => {
  const month = date.substring(0, 2);
  console.warn(month);

  const blankData = getBlankData(Number(month));

  data.forEach((item) => {
    blankData.splice(Number(item.day), 1, {
      produtos: item.products,
      valor: item.value,
      dia: Number(item.day),
    });
  });

  const graphData = blankData;
  console.warn(graphData);

  return graphData;
};

const getMeanProducts = (data) => {
  let totalP = 0;
  let totalD = 0;

  data.forEach((d) => {
    if (d.products > 0) {
      totalD += 1;
      totalP += d.products;
    }
  });

  return Math.ceil(totalP / totalD);
};

const getMeanValue = (data) => {
  let totalV = 0;
  let totalD = 0;

  data.forEach((d) => {
    if (d.value > 0) {
      totalD += 1;
      totalV += d.value;
    }
  });

  return (totalV / totalD).toFixed(2);
};

const orderStatistcs = {
  getTotalProducts,
  getMeanProducts,
  getTotalValue,
  getMeanValue,
  getGraphData,
  getBlankData,
};

export default orderStatistcs;
