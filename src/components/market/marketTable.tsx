"use client";
import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiMoreVertical } from "react-icons/fi";
import useMedia from "use-media";
import { PushpinOutlined } from "@ant-design/icons";

interface MarketData {
  icon: string;
  name: string;
  company: string;
  change: number;
  percentage: number;
  buyPrice: number;
  rangeLow: number;
  rangeHigh: number;
  currentPrice: number;
  changeDirection: "up" | "down";
  ytdChange: number; // Year-to-Date Change percentage
  oneYearChange: number; // 1-Year Change percentage
}

const MarketTable: React.FC = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 }); // lg screen

  const columns: ColumnsType<MarketData> = [
    {
      title: "Market",
      dataIndex: "name",
      key: "name",
      // Dynamically set width based on screen size
      width: isLargeScreen ? 170 : 118,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-start space-x-1 text-start md:-ml-2">
          <img
            src={record.icon}
            alt={record.name}
            className="h-8 w-7 rounded-full md:h-10 md:w-9"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.name}
            </p>
            <p className="whitespace-break-spaces text-[10px] leading-tight text-gray-500 md:-mt-1 md:text-xs">
              <span className="">{record.company}</span>
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "Price",
      dataIndex: "buyPrice",
      key: "buyPrice",
      sorter: (a, b) => a.buyPrice - b.buyPrice,
      render: (text) => (
        <p className="text-start text-xs text-black md:text-base ">
          {text} <span className="-ml-0.5 text-xs">Pkr</span>
        </p>
      ),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      sorter: (a, b) => a.change - b.change,
      render: (text, record) => (
        <div
          className={`text-left text-sm md:text-base ${
            record.changeDirection === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          <p className="text-sx font-normal md:text-base">{record.change}</p>
          <p className="text-xs font-medium ">{`${record.percentage}%`}</p>
        </div>
      ),
    },
    {
      title: "YTD Change",
      dataIndex: "ytdChange",
      key: "ytdChange",
      responsive: ["md"], // Hidden in mobile view, show on larger screens
      sorter: (a, b) => a.ytdChange - b.ytdChange,
      render: (text, record) => (
        <p
          className={`text-sm md:text-base ${record.ytdChange >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {text}%
        </p>
      ),
    },
    {
      title: "1-Year Change",
      dataIndex: "oneYearChange",
      key: "oneYearChange",
      responsive: ["md"], // Hidden in mobile view, show on larger screens
      sorter: (a, b) => a.oneYearChange - b.oneYearChange,
      render: (text, record) => (
        <p
          className={`text-sm md:text-base  ${record.oneYearChange >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {text}%
        </p>
      ),
    },
    {
      title: "Volume",
      dataIndex: "buyPrice",
      key: "volume",

      sorter: (a, b) => a.buyPrice - b.buyPrice,
      render: (text) => (
        <p className="text-xs text-black md:text-base">{text}</p>
      ),
      // Use Tailwind classes to handle responsive widths
      className: "w-[10px] lg:w-[150px]", // Smaller width for mobile and larger for large screens
    },

    {
      title: "52W Range",
      key: "range",
      width: 160, // Minimal width for the three-dot button

      responsive: ["md"], // Show on larger screens
      render: (text, record) => (
        <div className="relative py-3 text-left">
          <span className="absolute left-0 top-0.5 text-xs font-medium">
            {record.rangeLow}
          </span>
          <span className="absolute right-0 top-0.5  text-xs font-medium">
            {record.rangeHigh}
          </span>
          <div className="relative mt-3 h-3 w-full rounded-full bg-[#f1f1f1]">
            <div
              className="absolute h-3 rounded-full bg-[#f1f1f1]"
              style={{
                width: `${
                  ((record.currentPrice - record.rangeLow) /
                    (record.rangeHigh - record.rangeLow)) *
                  100
                }%`,
              }}
            ></div>
            <div
              className="absolute -ml-2 -mt-0.5 h-4 w-4 cursor-pointer rounded-full border border-gray-300 bg-primary shadow"
              style={{
                left: `${
                  ((record.currentPrice - record.rangeLow) /
                    (record.rangeHigh - record.rangeLow)) *
                  100
                }%`,
              }}
              aria-label={`Current Price: ${record.currentPrice}`}
            ></div>
          </div>
        </div>
      ),
    },

    {
      title: "High",
      dataIndex: "rangeHigh",
      key: "high",
      width: 50,

      responsive: ["xs"], // Show on smaller screens
      render: (text) => <span className="text-xs ">{text}</span>,
      sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
      title: "Low",
      dataIndex: "rangeLow",
      key: "low",
      width: 46,

      responsive: ["xs"], // Show on smaller screens
      render: (text) => <span className="text-xs ">{text}</span>,
      sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
      title: "",
      key: "action",
      width: 30,
      responsive: ["md"],

      render: (_, record) => (
        <div className="flex justify-end">
          <button
            className="text-gray-400 hover:text-black"
            aria-label="More options"
            onClick={(e) => showModal(e)}
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
      ),
    },
  ];

  const [selected, setSelected] = useState("1D");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const showModal = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const modalWidth = 180; // Approximate width of the modal

    // Check if the modal would go off-screen and adjust its position
    const adjustedLeft =
      rect.left + modalWidth > screenWidth
        ? screenWidth - modalWidth - 70 // Subtract to make it fit the screen with padding
        : rect.left;

    setModalPosition({
      top: rect.top,
      left: adjustedLeft,
    });

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const options = ["1D", "7D", "1M", "6M", "1Y", "3Y", "5Y"];

  return (
    <div className="relative md:mx-3">
      <div className=" flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-black">Market Overview</h1>
      </div>
      {/* Sticky Filters */}
      <div className="sticky top-0 z-10 mt-4 space-x-2 rounded-md bg-[#f1f5f9] p-1 md:p-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`rounded-md px-2 py-1 text-sm font-medium ${
              selected === option
                ? "bg-primary text-white"
                : "font-normal text-black"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Table Container with Sticky Header */}
      <div className="no-scrollbar sticky mt-2 w-full overflow-auto rounded-md bg-white">
        <Table
          columns={columns}
          dataSource={markets}
          pagination={false}
          rowKey="name"
          className="custom-table no-scrollbar w-full table-fixed overflow-auto"
          scroll={{ y: 400 }}
        />
      </div>
      <div style={{ marginTop: "50px", marginLeft: "50px" }}>
        <button
          onClick={showModal}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          Pin to the screen
        </button>

        {isModalVisible && (
          <div>
            <Modal
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              closable={false}
              width={150}
              style={{
                position: "absolute",
                top: modalPosition.top,
                left: modalPosition.left,
                padding: "8px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
              bodyStyle={{ padding: "10px", fontSize: "14px" }}
            >
              <div
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                {/* Pin icon and text */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  Add to watchlist
                </div>

                {/* Arrow triangle */}
              </div>
              <div
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                {/* Pin icon and text */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  Add to notfication
                </div>

                {/* Arrow triangle */}
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketTable;

const markets: MarketData[] = [
  {
    icon: "https://seeklogo.com/images/E/engro-logo-2D55F166AB-seeklogo.com.png",
    name: "ENGRO",
    company: "Engro Corporation",
    change: 5,
    percentage: 1.5,
    buyPrice: 300,
    rangeLow: 250,
    rangeHigh: 350,
    currentPrice: 320,
    changeDirection: "up",
    ytdChange: 12,
    oneYearChange: 15,
  },
  {
    icon: "https://seeklogo.com/images/H/habib-bank-limited-logo-68A77260BA-seeklogo.com.png",
    name: "HBL",
    company: "Habib Bank Limited",
    change: -3,
    percentage: -1,
    buyPrice: 120,
    rangeLow: 100,
    rangeHigh: 150,
    currentPrice: 115,
    changeDirection: "down",
    ytdChange: -8,
    oneYearChange: -10,
  },
  {
    icon: "https://www.lucky-cement.com/wp-content/themes/lucky/assets/images/logo/lucky_cement_logo.png",
    name: "LUCK",
    company: "Lucky Cement",
    change: 7,
    percentage: 2.1,
    buyPrice: 600,
    rangeLow: 550,
    rangeHigh: 700,
    currentPrice: 650,
    changeDirection: "up",
    ytdChange: 18,
    oneYearChange: 20,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/PTCL_Logo.svg/2048px-PTCL_Logo.svg.png",
    name: "PTCL",
    company: "Pakistan Telecommunication Company Limited",
    change: 0.5,
    percentage: 0.2,
    buyPrice: 12,
    rangeLow: 10,
    rangeHigh: 15,
    currentPrice: 13,
    changeDirection: "up",
    ytdChange: 5,
    oneYearChange: 6,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/6/66/Oil_and_Gas_Development_Company_logo.png",
    name: "OGDC",
    company: "Oil & Gas Development Company",
    change: -2,
    percentage: -0.7,
    buyPrice: 100,
    rangeLow: 90,
    rangeHigh: 120,
    currentPrice: 98,
    changeDirection: "down",
    ytdChange: -4,
    oneYearChange: -5,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/d/da/Fauji_Fertilizer_Company_Logo.png",
    name: "FFC",
    company: "Fauji Fertilizer Company",
    change: 3,
    percentage: 1,
    buyPrice: 105,
    rangeLow: 95,
    rangeHigh: 115,
    currentPrice: 110,
    changeDirection: "up",
    ytdChange: 8,
    oneYearChange: 10,
  },
  {
    icon: "https://seeklogo.com/images/U/unilever-logo-3B472C0E13-seeklogo.com.png",
    name: "UNILEVER",
    company: "Unilever Pakistan",
    change: 4,
    percentage: 2,
    buyPrice: 2400,
    rangeLow: 2200,
    rangeHigh: 2600,
    currentPrice: 2450,
    changeDirection: "up",
    ytdChange: 10,
    oneYearChange: 12,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Pakistan_International_Airlines_Logo.svg/1024px-Pakistan_International_Airlines_Logo.svg.png",
    name: "PIA",
    company: "Pakistan International Airlines",
    change: -0.3,
    percentage: -2,
    buyPrice: 5,
    rangeLow: 3,
    rangeHigh: 7,
    currentPrice: 4.5,
    changeDirection: "down",
    ytdChange: -15,
    oneYearChange: -18,
  },
  {
    icon: "https://seeklogo.com/images/E/engro-logo-2D55F166AB-seeklogo.com.png",
    name: "ENGRO",
    company: "Engro Corporation",
    change: 5,
    percentage: 1.5,
    buyPrice: 300,
    rangeLow: 250,
    rangeHigh: 350,
    currentPrice: 320,
    changeDirection: "up",
    ytdChange: 12,
    oneYearChange: 15,
  },
  {
    icon: "https://seeklogo.com/images/H/habib-bank-limited-logo-68A77260BA-seeklogo.com.png",
    name: "HBL",
    company: "Habib Bank Limited",
    change: -3,
    percentage: -1,
    buyPrice: 120,
    rangeLow: 100,
    rangeHigh: 150,
    currentPrice: 115,
    changeDirection: "down",
    ytdChange: -8,
    oneYearChange: -10,
  },
  {
    icon: "https://www.lucky-cement.com/wp-content/themes/lucky/assets/images/logo/lucky_cement_logo.png",
    name: "LUCK",
    company: "Lucky Cement",
    change: 7,
    percentage: 2.1,
    buyPrice: 600,
    rangeLow: 550,
    rangeHigh: 700,
    currentPrice: 650,
    changeDirection: "up",
    ytdChange: 18,
    oneYearChange: 20,
  },
  {
    icon: "https://seeklogo.com/images/E/engro-logo-2D55F166AB-seeklogo.com.png",
    name: "ENGRO",
    company: "Engro Corporation",
    change: 5,
    percentage: 1.5,
    buyPrice: 300,
    rangeLow: 250,
    rangeHigh: 350,
    currentPrice: 320,
    changeDirection: "up",
    ytdChange: 12,
    oneYearChange: 15,
  },
  {
    icon: "https://seeklogo.com/images/H/habib-bank-limited-logo-68A77260BA-seeklogo.com.png",
    name: "HBL",
    company: "Habib Bank Limited",
    change: -3,
    percentage: -1,
    buyPrice: 120,
    rangeLow: 100,
    rangeHigh: 150,
    currentPrice: 115,
    changeDirection: "down",
    ytdChange: -8,
    oneYearChange: -10,
  },
  {
    icon: "https://www.lucky-cement.com/wp-content/themes/lucky/assets/images/logo/lucky_cement_logo.png",
    name: "LUCK",
    company: "Lucky Cement",
    change: 7,
    percentage: 2.1,
    buyPrice: 600,
    rangeLow: 550,
    rangeHigh: 700,
    currentPrice: 650,
    changeDirection: "up",
    ytdChange: 18,
    oneYearChange: 20,
  },
];
