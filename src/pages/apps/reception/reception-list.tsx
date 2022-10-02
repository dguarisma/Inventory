import { useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { PDFDownloadLink, Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
// import PSPDFKit from "./PSPDFKit";

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useSelector } from 'store';

import Export from 'components/ExportToFile';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';

// assets
import { EyeTwoTone, FilePdfOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
}

function ReactTable({ columns, data, getHeaderProps }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'nc', desc: true };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    rows,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { globalFilter, pageIndex, pageSize },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    setSortBy
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Export excelData={data} fileName="Purchase" />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell: any) => (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

// ==============================|| RECEPTION - LIST VIEW ||============================== //

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 15,
    textAlign: 'center'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8
  },
  summary: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 8,
    fontWeight: 600
  },
  subtitle: {
    fontSize: 12,
    margin: 12,
    fontWeight: 600
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  page: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  section: {
    fontSize: 12,
    width: 110,
    margin: 5,
    padding: 5,
    flexGrow: 1
  }
});
// Create Document Component
const MyDocument = ({ data }: any) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          Fecha {data?.create_order} # Order {data?.nc}
        </Text>
        <Text style={styles.header} fixed>
          Bodega {data?.warehouse}
        </Text>
        <Text style={styles.title}>{data?.supplier.businessName}</Text>
        <Text style={styles.author}>NIT: {data?.supplier.nit}</Text>
        <Text style={styles.author}>Email: {data?.supplier.email}</Text>
        <Text style={styles.author}>Teléfono: {data?.supplier.phone}</Text>

        <Text style={styles.subtitle}>Detalles de Recepción</Text>
        <View style={styles.row}>
          <View style={styles.section}>
            <Text>Producto</Text>
          </View>
          <View style={styles.section}>
            <Text>Precio Base</Text>
          </View>
          <View style={styles.section}>
            <Text>Cantidad</Text>
          </View>
          <View style={styles.section}>
            <Text>Subtotal</Text>
          </View>
        </View>
        {data?.products.map((item: any, index: number) => (
          <View style={styles.row} key={index}>
            <View style={styles.section}>
              <Text>{item?.name}</Text>
              <Text>SKU{item?.sku}</Text>
            </View>
            <View style={styles.section}>
              <Text>{item?.price}</Text>
            </View>
            <View style={styles.section}>
              <Text>{item?.qty}</Text>
            </View>
            <View style={styles.section}>
              <Text>{item?.qty * item?.price}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.summary}>Subtotal: {data?.subtotal}</Text>
        {data?.tax !== '' && <Text style={styles.summary}>iva: {data?.tax}</Text>}
        <Text style={styles.summary}>Total: {data?.total}</Text>
      </Page>
    </Document>
  );
};

const ReceptionList = () => {
  const theme = useTheme();
  const history = useNavigate();

  const handleViewReception = (id: any) => {
    history(`/reception/view-reception/${id}`);
  };
  const { listPurchase } = useSelector((state) => state.purchase);
  const columns = useMemo(
    () => [
      {
        Header: 'Order',
        accessor: 'nc',
        className: 'cell-center'
      },
      {
        Header: 'Proveedor',
        accessor: 'supplier',
        Cell: ({ row }: any) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values?.supplier?.businessName}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {values?.supplier?.nit}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {values?.supplier?.email}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Fecha OC',
        accessor: 'create_order',
        disableSortBy: true
      },
      {
        Header: 'Bodega',
        accessor: 'warehouse'
      },
      {
        Header: 'Subtotal',
        accessor: 'subtotal',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total Descuento',
        accessor: 'discount',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'IVA',
        accessor: 'tax',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total',
        accessor: 'total',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Estado',
        accessor: 'orderStatus',
        Cell: ({ row }: any) => {
          const { original } = row;
          let status = original.orderStatus ? original.orderStatus : original.status;
          switch (status) {
            case 'Partial':
              return <Chip color="warning" label="Partial" size="small" variant="light" />;
            case 'Completed':
              return <Chip color="success" label="Completed" size="small" variant="light" />;
            case 'Cancelled':
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 'Send':
              return <Chip color="info" label="Send" size="small" variant="light" />;
            case 'New':
            default:
              return <Chip color="warning" label="New" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <PDFDownloadLink document={<MyDocument data={row.original} />} fileName="reception.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? (
                    'Loading document...'
                  ) : (
                    <IconButton color="primary">
                      <FilePdfOutlined twoToneColor={theme.palette.primary.main} />
                    </IconButton>
                  )
                }
              </PDFDownloadLink>

              <Tooltip title="Ingresar">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleViewReception(row.values.nc);
                  }}
                >
                  <EyeTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={listPurchase as []} getHeaderProps={(column: any) => column.getSortByToggleProps()} />
      </ScrollX>
    </MainCard>
  );
};

export default ReceptionList;
