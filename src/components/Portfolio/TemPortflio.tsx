'use client'
import React, { useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useMedia from "use-media";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { fetchUserPortfolio, selectPortfolio, selectPortfolioLoading } from "@/lib/redux/features/portoflio/portfolioSlice";

// Define the TradeType enum to match your backend
enum TradeType {
  LONG = "LONG",
  SHORT = "SHORT"
}

// Define interfaces
interface TransactionDisplay {
  id: string;
  symbol: string;
  tradeType: string;
  assetType: string;
  date: string;
  price: number;
  quantity: number;
  icon: string;
  company: string;
  dividendInfo?: {
    totalDividends: number;
    totalTax: number;
  };
}

interface Dividend {
  symbol: string;
  totalAmount: number;
  taxType: 'FILER' | 'NON_FILER';
}

interface Transaction {
  id: string;  // Ensure this matches TransactionDisplay
  symbol: string;
  tradeType: TradeType;
  assetType: string;
  date: string;
  price: number;
  quantity: number;
}

interface Portfolio {
  transactions: Transaction[];
  dividends?: Dividend[];
}

const TempPortfolio = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 });
  const dispatch = useDispatch<AppDispatch>();
  const portfolio = useSelector(selectPortfolio);
  const loading = useSelector(selectPortfolioLoading);

  useEffect(() => {
    dispatch(fetchUserPortfolio())
      .then((result) => {
        console.log('Portfolio fetch result:', result);
      })
      .catch((error) => {
        console.error('Error fetching portfolio:', error);
      });
  }, [dispatch]);

  // Process portfolio data to match table structure
  const processedData: TransactionDisplay[] = React.useMemo(() => {
    if (!portfolio?.transactions?.length) {
      return [];
    }

    return portfolio.transactions.map(transaction => {
      const relatedDividends = portfolio.dividends?.filter(d => d.symbol === transaction.symbol) || [];
      
      // Ensure id is treated as string
      return {
        id: String(transaction.id), // Convert to string if necessary
        symbol: transaction.symbol,
        tradeType: transaction.tradeType.toString(),
        assetType: transaction.assetType,
        date: transaction.date,
        price: transaction.price,
        quantity: transaction.quantity,
        icon: `/api/placeholder/32/32`,
        company: transaction.symbol,
        dividendInfo: {
          totalDividends: relatedDividends.reduce((sum, d) => sum + (d.totalAmount || 0), 0),
          totalTax: relatedDividends.reduce((sum, d) => sum + (d.totalAmount * (d.taxType === 'FILER' ? 0.15 : 0.30)), 0)
        }
      };
    });
  }, [portfolio]);

  const columns: ColumnsType<TransactionDisplay> = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: isLargeScreen ? 200 : 158,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, record) => (
        <div className="flex items-start space-x-1 text-start">
          <img
            src={record.icon}
            alt={record.symbol}
            className="h-8 w-7 rounded-full md:h-10 md:w-9"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.symbol}
            </p>
            <p className="whitespace-break-spaces text-[10px] leading-tight text-gray-500 md:text-xs">
              {record.company}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Trade Type",
      dataIndex: "tradeType",
      key: "tradeType",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => a.tradeType.localeCompare(b.tradeType),
      render: (text) => (
        <p className="text-start text-base text-black">
          {text}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => a.price - b.price,
      render: (text) => (
        <p className="text-start text-base text-black">
          ${Number(text).toFixed(2)}
        </p>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text) => (
        <p className="text-start text-base text-black">
          {Number(text).toFixed(2)}
        </p>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: isLargeScreen ? 150 : 120,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (text) => (
        <p className="text-start text-base text-black">
          {new Date(text).toLocaleDateString()}
        </p>
      ),
    },
    {
      title: "Dividends",
      dataIndex: "dividendInfo",
      key: "dividends",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => (a.dividendInfo?.totalDividends || 0) - (b.dividendInfo?.totalDividends || 0),
      render: (info) => (
        <p className="text-start text-base text-black">
          ${Number(info?.totalDividends || 0).toFixed(2)}
        </p>
      ),
    }
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between md:mt-10 mt-5 py-5">
        <h1 className="text-2xl font-semibold text-black">Temp Portfolio</h1>
      </div>
      <div className="mt-2 w-full rounded-md bg-white">
        <Table
          columns={columns}
          dataSource={processedData}
          rowKey="id"
          loading={loading === "pending"}
          className="custom-table no-scrollbar w-full table-fixed overflow-auto"
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>
    </div>
  );
};

export default TempPortfolio;