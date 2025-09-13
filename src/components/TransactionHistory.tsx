import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { GetTransactionHistory } from "../api/Transaction";
import { Button } from "./Button";
import type { Transaction } from "../type/details";
import { formatCurrency, formatDate } from "../utils/Formatting";

// Konstanta untuk jumlah item per halaman
const LIMIT = 5;

// Fungsi helper untuk memformat tanggal

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true); // Untuk tahu kapan harus berhenti memuat
  const token = localStorage.getItem("token") || "";

  // Gunakan useCallback agar fungsi fetch stabil
  const fetchTransactions = useCallback(
    async (currentOffset: number) => {
      if (!token || !hasMore) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await GetTransactionHistory(token, currentOffset, LIMIT);

        if (data.records && data.records.length > 0) {
          // Jika offset 0, ganti data. Jika tidak, tambahkan ke data yang sudah ada.
          setTransactions((prev) => (currentOffset === 0 ? data.records : [...prev, ...data.records]));
          // Jika jumlah data yang kembali kurang dari limit, berarti sudah habis
          if (data.records.length < LIMIT) {
            setHasMore(false);
          }
        } else {
          setHasMore(false); // Tidak ada lagi data untuk dimuat
        }
      } catch (err) {
        console.error("Gagal memuat riwayat transaksi:", err);
        toast.error("Gagal memuat riwayat transaksi.");
      } finally {
        setLoading(false);
      }
    },
    [token, hasMore]
  );

  // Efek untuk memuat data pertama kali
  useEffect(() => {
    fetchTransactions(0);
  }, [fetchTransactions]);

  const handleShowMore = () => {
    const nextOffset = offset + LIMIT;
    setOffset(nextOffset);
    fetchTransactions(nextOffset);
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Semua Transaksi</h3>

      <div className="space-y-4">
        {transactions.length > 0
          ? transactions.map((trx) => (
              <div key={trx.invoice_number} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className={`text-lg font-bold ${trx.transaction_type === "TOPUP" ? "text-green-600" : "text-red-600"}`}>
                    {trx.transaction_type === "TOPUP" ? "+" : "-"} {formatCurrency(trx.total_amount)}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(trx.created_on)}</p>
                </div>
                <p className="text-sm font-medium text-gray-700">{trx.description}</p>
              </div>
            ))
          : !loading && <p className="text-center text-gray-500">Tidak ada riwayat transaksi.</p>}
      </div>

      {loading && <p className="text-center text-gray-500 mt-6">Memuat...</p>}

      {hasMore && !loading && transactions.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={handleShowMore}>
            Show more
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
