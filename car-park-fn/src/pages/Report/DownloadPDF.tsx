import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink, Page, Text, Document, StyleSheet, View, Font } from '@react-pdf/renderer';
import { Car } from '../../features/models';

import NotoSan from './NotoSansTC-Regular.otf'

// import 'reactjs-popup/dist/index.css';

// import "./DownloadPDF.css";

const fetchData = async () => {

  const response = await fetch(`${process.env.REACT_APP_API_BASE}carpark/getReadTable`);
  const result = await response.json();
  return result.data as Car[]
};
console.log(fetchData)

Font.register({
  family: 'NotoSan',
  src: NotoSan
});

const re = /T/gi;

const PdfDocument = ({ data }: { data: any }) => (

  <Document>
    <Page style={styles.page} orientation="landscape" size="A4">
      <Text style={styles.title}>時租交易記錄</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeaderCellLeft}>收據編號</Text>
          <Text style={styles.columnLessThin}>次序</Text>
          <Text style={styles.tableHeaderCell}>車牌號碼</Text>
          <Text style={styles.tableHeaderCell}>車類</Text>
          <Text style={styles.tableHeaderCell}>泊車日期&時間</Text>
          <Text style={styles.tableHeaderCell}>出車日期&時間</Text>
          <Text style={styles.columnLessThin}>總時數</Text>
          <Text style={styles.columnThin}>時</Text>
          <Text style={styles.columnThin}>日</Text>
          <Text style={styles.columnThin}>夜</Text>
          {/* <Text style={styles.columnThin}>24</Text>
          <Text style={styles.columnThin}>全</Text>
          <Text style={styles.columnThin}>失</Text>
          <Text style={styles.columnThin}>+/-</Text> */}
          <Text style={styles.tableHeaderCell}>總金額</Text>
          <Text style={styles.tableHeaderCell}>狀況</Text>
          <Text style={styles.tableHeaderCellRight}>職員編號</Text>
        </View>

        {data.map((car: any, idx: number) => (

          <View break={(idx === 14) || ((idx + 2) % 16 === 0 && idx >= 14)} key={car.id} style={styles.tableRow}>

            <Text style={styles.tableCellLeft}>{car.invoice_num}</Text>
            <Text style={styles.columnLessThin}>{car.id}</Text>
            <Text style={styles.tableCell}>{car.plate_num}</Text>
            <Text style={styles.tableCell}>{car.vehicle_type === "small_car" ? "小型車" : "電單車"}</Text>
            <Text style={styles.tableCell}>{car.entry_time.slice(0, -5).replace(re, " ")}</Text>
            <Text style={styles.tableCell}>{car.exit_time.slice(0, -5).replace(re, " ")}</Text>
            <Text style={styles.columnLessThin}>{car.total_hours}</Text>
            <Text style={styles.columnThin}>{car.parked_hours}</Text>
            <Text style={styles.columnThin}>{car.parked_days}</Text>
            <Text style={styles.columnThin}>{car.parked_nights}</Text>
            <Text style={styles.columnThin}>{car.id}</Text>
            <Text style={styles.columnThin}>{car.id}</Text>
            <Text style={styles.columnThin}>{car.id}</Text>
            <Text style={styles.columnThin}>{car.id}</Text>
            <Text style={styles.tableCell}>{car.payment}</Text>
            <Text style={styles.tableCell}>{car.status === "left" ? "已出車" : "/"}</Text>
            <Text style={styles.tableCellRight}>{car.staff_id}</Text>

          </View>


        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSan',
    fontSize: "8px",
    padding: '1cm',
    width: '100%',
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    // borderLeftWidth: 2,
    // borderRightWidth: 1,
    // borderTopWidth: 2,
    // borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#555',
  },
  tableHeaderCell: {
    backgroundColor: '#f2f2f2',
    padding: 4,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRightWidth: 0.5,
    borderColor: '#555',
  },
  tableHeaderCellLeft: {
    backgroundColor: '#f2f2f2',
    padding: 4,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderLeftWidth: 1,
    borderRightWidth: 0.5,
    borderColor: '#555',
  },
  tableHeaderCellRight: {
    backgroundColor: '#f2f2f2',
    padding: 4,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderColor: '#555',
  },
  tableCell: {
    padding: 4,
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 0.5,
    borderColor: '#555',
  },
  tableCellLeft: {
    padding: 4,
    flex: 1,
    textAlign: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 0.5,
    borderColor: '#555',
  },
  tableCellRight: {
    padding: 4,
    flex: 1,
    textAlign: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderColor: '#555',
  },
  columnThin: {
    padding: 4,
    // flex: 1,
    textAlign: 'center',
    borderRightWidth: 0.5,
    borderColor: '#555',
    // width:'10px',
    width: "24px"
  },
  columnLessThin: {
    padding: 4,
    // flex: 1,
    textAlign: 'center',
    borderRightWidth: 0.5,
    borderColor: '#555',
    // width:'10px',
    width: "40px"
  },
});

const DownloadPDF = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["carList"],
    queryFn: fetchData
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  console.log(data)
  return (
    <div>
      <PDFDownloadLink document={<PdfDocument data={data} />} fileName="car-data.pdf" className='pdfModal'>
        {({ blob, url, loading, error:any  }) => (loading ? '載入中...' : '點擊下載')}
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPDF;
