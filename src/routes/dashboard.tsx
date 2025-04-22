  import { ProductProps, Table } from "../components/table/table";
  import { Cards, CardsProps } from "../components/cards/cards";
import data from "../data/data.json";

export const Dashboard = () => {
  return (
    <>
      <Cards cards={data.cards as CardsProps["cards"]} />

      <Table data={data.orders as ProductProps[]} />
    </>
  );
};
