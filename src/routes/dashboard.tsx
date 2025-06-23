  import { CompanyProps, Table } from "../components/table/table";
import data from "../data/data.json";

export const Dashboard = () => {
  return (
    <>

      <Table
        data={
          (data.files as any[]).map((item) => ({
            ...item,
            pdfs: Object.values(item.pdfs || {}).flat(),
          })) as CompanyProps[]
        }
      />
    </>
  );
};
