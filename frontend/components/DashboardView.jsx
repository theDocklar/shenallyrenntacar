'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, AlertTriangle, Car, FileCheck, CheckCircle2, Clock } from 'lucide-react';

export default function DashboardView({ onNavigate }) {
  const { vehicles, rentals, payments, costs, currentUser } = useStore();

  const totalVehicles = vehicles.length;
  const rentedVehicles = vehicles.filter((v) => v.status === 'RENTED').length;
  const availableVehicles = vehicles.filter((v) => v.status === 'AVAILABLE').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'MAINTENANCE').length;
  const utilizationPct = totalVehicles ? Math.round((rentedVehicles / totalVehicles) * 100) : 0;

  const activeRentals = rentals.filter((r) => r.status === 'ACTIVE');
  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalCosts = costs.reduce((sum, c) => sum + Number(c.amount), 0);
  const netProfit = totalRevenue - totalCosts;

  return (
    <div className="space-y-8">
      {/* Swiss Hero Section inspired directly by reference design */}
      <div className="border border-[#0A0A0C]/15 bg-white p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative construction grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full border-b border-[#FF4F00] grid grid-cols-4">
            <div className="border-r border-[#FF4F00]"></div>
            <div className="border-r border-[#FF4F00]"></div>
            <div className="border-r border-[#FF4F00]"></div>
            <div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Left Hero Block */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#FF4F00] uppercase font-bold mb-3">
                <span className="w-2 h-2 bg-[#FF4F00] inline-block"></span>
                <span>SYSTEM DISPATCH // SRI LANKA OPERATIONS</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-[#FF4F00] leading-none mb-4">
                FLEET
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0C] max-w-xl">
                Structure Meets Precision: Real-Time Fleet Margins & Renter Verification
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6E7381] max-w-lg mt-6 leading-relaxed">
              Designed for small-to-midsize rental operators in Sri Lanka. Reconcile insurance risks, track foreign tourist driving permits, and automatically calculate per-vehicle net profit.
            </p>
          </div>

          {/* Right Hero Block - Architectural Card */}
          <div className="lg:col-span-4 border-l border-[#0A0A0C]/10 pl-0 lg:pl-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#FF4F00]">
                <div className="w-3 h-3 bg-[#FF4F00]"></div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Operational Summary</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-[#0A0A0C]">
                <div className="flex justify-between py-1 border-b border-[#0A0A0C]/10">
                  <span className="text-[#6E7381]">REGISTERED FLEET:</span>
                  <span className="font-bold">{totalVehicles} VEHICLES</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#0A0A0C]/10">
                  <span className="text-[#6E7381]">ACTIVE ON ROAD:</span>
                  <span className="font-bold text-[#FF4F00]">{rentedVehicles} VEHICLES</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#0A0A0C]/10">
                  <span className="text-[#6E7381]">READY IN YARD:</span>
                  <span className="font-bold text-emerald-700">{availableVehicles} AVAILABLE</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#0A0A0C]/10">
                  <span className="text-[#6E7381]">WORKSHOP SERVICE:</span>
                  <span className="font-bold text-amber-700">{maintenanceVehicles} UNITS</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('rentals')}
              className="w-full py-3 bg-[#FF4F00] hover:bg-[#E04500] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2"
            >
              <span>DISPATCH NEW RENTAL</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Blocks - 4 Grid Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#0A0A0C]/15 p-5 relative"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7381]">
            <span className="uppercase font-bold">01 // FLEET UTILIZATION</span>
            <span className="w-1.5 h-1.5 bg-[#FF4F00]"></span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono tracking-tight text-[#0A0A0C]">
              {utilizationPct}%
            </span>
            <span className="text-xs font-mono font-bold text-[#FF4F00] bg-[#FFF5F0] px-2 py-0.5 border border-[#FF4F00]/20">
              {rentedVehicles} ON ROAD
            </span>
          </div>
          <div className="mt-3 w-full bg-[#EAEAEA] h-1.5 overflow-hidden">
            <div
              className="bg-[#FF4F00] h-full transition-all duration-500"
              style={{ width: `${utilizationPct}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white border border-[#0A0A0C]/15 p-5 relative"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7381]">
            <span className="uppercase font-bold">02 // ACTIVE CONTRACTS</span>
            <span className="w-1.5 h-1.5 bg-[#FF4F00]"></span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono tracking-tight text-[#0A0A0C]">
              {activeRentals.length}
            </span>
            <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 border border-slate-300">
              INSPECTIONS VERIFIED
            </span>
          </div>
          <p className="mt-3 text-[11px] font-mono text-[#6E7381]">
            1 foreign tourist rental active
          </p>
        </motion.div>

        {/* Metric 3 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white border border-[#0A0A0C]/15 p-5 relative"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7381]">
            <span className="uppercase font-bold">03 // 7-DAY REVENUE</span>
            <span className="w-1.5 h-1.5 bg-emerald-600"></span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tracking-tight text-emerald-700">
              LKR {totalRevenue.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
              SETTLED
            </span>
          </div>
          <p className="mt-3 text-[11px] font-mono text-[#6E7381]">
            Recorded via Cash, Bank & POS
          </p>
        </motion.div>

        {/* Metric 4 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white border border-[#0A0A0C]/15 p-5 relative"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6E7381]">
            <span className="uppercase font-bold">04 // FLEET NET MARGIN</span>
            <span className="w-1.5 h-1.5 bg-[#FF4F00]"></span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tracking-tight text-[#0A0A0C]">
              LKR {netProfit.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono font-bold text-[#FF4F00] bg-[#FFF5F0] px-1.5 py-0.5 border border-[#FF4F00]/20">
              NET LKR
            </span>
          </div>
          <p className="mt-3 text-[11px] font-mono text-[#6E7381]">
            Deducted LKR {totalCosts.toLocaleString()} workshop costs
          </p>
        </motion.div>
      </div>

      {/* Main Grid: Attention Feed & Profit Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: High Priority Action Required */}
        <div className="lg:col-span-4 border border-[#0A0A0C]/15 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0A0A0C]/10">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-[#FF4F00] inline-block"></span>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0C]">
                Action Required // Alerts
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-[#FFF5F0] text-[#FF4F00] border border-[#FF4F00]/30 px-2 py-0.5 font-bold">
              2 PENDING
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 border border-amber-300 bg-amber-50/60 text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-amber-900">
                <span>WP ND-5509 (KDH VAN)</span>
                <span className="text-[9px] bg-amber-200 text-amber-900 px-1 py-0.2">WORKSHOP</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                90,000 KM injector overhaul in progress at Toyota Lanka Wattala. Invoice pending entry.
              </p>
            </div>

            <div className="p-3.5 border border-blue-300 bg-blue-50/60 text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-blue-900">
                <span>DAVID MILLER (SR-0147)</span>
                <span className="text-[9px] bg-blue-200 text-blue-900 px-1 py-0.2">RETURN OCT 07</span>
              </div>
              <p className="text-[11px] text-blue-800 mt-1 leading-relaxed">
                Tourist self-drive return due in 3 days. Airport temporary permit on file. Return inspection ready.
              </p>
            </div>

            <div className="p-3.5 border border-[#0A0A0C]/10 bg-[#FAFAFA] text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-slate-800">
                <span>WHATSAPP DISPATCH</span>
                <span className="text-[9px] bg-slate-200 text-slate-800 px-1 py-0.2">SCHEDULED</span>
              </div>
              <p className="text-[11px] text-[#6E7381] mt-1 leading-relaxed">
                Weekly fleet performance digest queue for Monday 08:00 AM SLST via Meta Cloud API.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Per-Vehicle Net Profit Engine */}
        <div className="lg:col-span-8 border border-[#0A0A0C]/15 bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#0A0A0C]/10 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-[#0A0A0C] inline-block"></span>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0C]">
                  Per-Vehicle Profitability Matrix
                </h3>
              </div>
              <p className="text-[11px] text-[#6E7381] font-mono mt-0.5">
                Contract revenue deducted against routine maintenance, insurance and repairs
              </p>
            </div>
            <button
              onClick={() => onNavigate('vehicles')}
              className="text-xs font-mono font-bold text-[#FF4F00] hover:underline flex items-center space-x-1"
            >
              <span>INSPECT FLEET MATRIX</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-[#0A0A0C]/10 text-left text-[10px] text-[#6E7381] uppercase tracking-wider">
                  <th className="pb-3">PLATE / MODEL</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3 text-right">REVENUE (LKR)</th>
                  <th className="pb-3 text-right">EXPENSES (LKR)</th>
                  <th className="pb-3 text-right">NET PROFIT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0A0A0C]/5">
                {vehicles.map((v) => {
                  const rev = rentals
                    .filter((r) => r.vehiclePlate === v.plateNumber)
                    .reduce((sum, r) => sum + Number(r.totalAmount), 0);
                  const cost = costs
                    .filter((c) => c.vehiclePlate === v.plateNumber)
                    .reduce((sum, c) => sum + Number(c.amount), 0);
                  const net = rev - cost;

                  return (
                    <tr key={v.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-3 font-bold text-[#0A0A0C]">
                        <div>{v.plateNumber}</div>
                        <div className="text-[10px] font-normal text-[#6E7381]">
                          {v.make} {v.model}
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider border ${
                            v.status === 'AVAILABLE'
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                              : v.status === 'RENTED'
                              ? 'border-[#FF4F00]/30 bg-[#FFF5F0] text-[#FF4F00]'
                              : 'border-amber-300 bg-amber-50 text-amber-800'
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium">
                        LKR {rev.toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-rose-700 font-medium">
                        LKR {cost.toLocaleString()}
                      </td>
                      <td className={`py-3 text-right font-bold ${net >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        LKR {net.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
