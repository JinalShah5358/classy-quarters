import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinOperation() {
  const FilterOptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No Discount" },
    { value: "with-discount", label: "With Discount" },
  ];
  const sortOptions = [
    { value: "name-asc", label: "sort by name(A-Z)" },
    { value: "name-dsc", label: "sort by name(Z-A)" },
    { value: "regularPrice-asc", label: "sort by price (low first)" },
    { value: "regularPrice-dsc", label: "sort by price (high first)" },
    { value: "maxCapacity-asc", label: "sort by Capacity (low first)" },
    { value: "maxCapacity-dsc", label: "sort by Capacity (high first)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" options={FilterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinOperation;
