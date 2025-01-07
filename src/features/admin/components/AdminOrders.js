import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import StatusBadge from "../../common/StatusBadge"; // Custom Component for Status

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    setSort((prevSort) => {
      const newOrder =
        prevSort._sort === sortOption.sort && prevSort._order === "asc"
          ? "desc"
          : "asc";

      return { _sort: sortOption.sort, _order: newOrder };
    });
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE }; // Ensure it's declared here
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]); // Ensure pagination isn't in the dependency array

  return (
    <div className="overflow-x-auto bg-gray-50 p-5">
      {/* Analytics Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">Admin Orders</h1>
        <div className="text-sm text-gray-500">
          Total Orders: {totalOrders} | Page: {page}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded overflow-hidden">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-sm leading-normal">
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort({ sort: "id" })}
              >
                Order#
                {sort._sort === "id" &&
                  (sort._order === "asc" ? (
                    <ArrowUpIcon className="inline w-4" />
                  ) : (
                    <ArrowDownIcon className="inline w-4" />
                  ))}
              </th>
              <th className="py-3 px-6 text-left">Items</th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort({ sort: "totalAmount" })}
              >
                Total Amount
                {sort._sort === "totalAmount" &&
                  (sort._order === "asc" ? (
                    <ArrowUpIcon className="inline w-4" />
                  ) : (
                    <ArrowDownIcon className="inline w-4" />
                  ))}
              </th>
              <th className="py-3 px-6 text-center">Shipping Address</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{order.id}</td>
                <td className="py-3 px-6 text-left">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>
                        {item.title} - #{item.quantity}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="py-3 px-6 text-left">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-center">
                  {order.selectedAddress.city}
                </td>
                <td className="py-3 px-6 text-center">
                  {order.id === editableOrderId ? (
                    <select
                      onChange={(e) => handleUpdate(e, order)}
                      className="border p-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <StatusBadge status={order.status} />
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center items-center">
                    <EyeIcon
                      className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer mr-4"
                      onClick={() => handleShow(order)}
                    />
                    <PencilIcon
                      className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer"
                      onClick={() => handleEdit(order)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
}

export default AdminOrders;
