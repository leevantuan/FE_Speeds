// mock.ts
import { WifiTestDashboardData, Endpoint } from './model';

const client1: Endpoint = { label: '192.168.1.10', ip: '192.168.1.10', meta: '(Wi-Fi)' };
const client2: Endpoint = { label: '192.168.1.11', ip: '192.168.1.11', meta: '(LAN)' };

export const WIFI_TEST_DASHBOARD_MOCK: WifiTestDashboardData = {
  header: {
    siteName: 'YEP Hall - Floor 1',
    locationLabel: 'Vị trí: Cổng vào',
    runId: '#1290',
    startTime: '12:32:10',
  },

  topology: {
    client: { rssiDbm: -45, snrDb: 30 },
    assetPoint: { speedMbps: 300 },
    server: { rttMs: null },
  },

  kpis: {
    rttAvgMs: null,
    jitterMs: null,
    packetLossPct: null,
    throughputMbps: null,
  },

  configOptions: {
    segments: [
      { label: 'Client → AssetPoint', value: 'CLIENT_TO_ASSETPOINT' },
      { label: 'AssetPoint → Server', value: 'ASSETPOINT_TO_SERVER' },
      { label: 'End-to-End', value: 'END_TO_END' },
      { label: 'Run All', value: 'RUN_ALL' },
    ],
    clients: [
      { label: `${client1.label} ${client1.meta ?? ''}`.trim(), value: client1 },
      { label: `${client2.label} ${client2.meta ?? ''}`.trim(), value: client2 },
    ],
    packetSizes: [
      { label: '10KB', value: '10KB' },
      { label: '20KB', value: '20KB' },
      { label: '50KB', value: '50KB' },
      { label: '100KB', value: '100KB' },
      { label: 'Custom', value: 'CUSTOM' },
    ],
    countPerSize: [
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: '200', value: 200 },
      { label: '500', value: 500 },
    ],
    intervalMs: [
      { label: '10 ms', value: 10 },
      { label: '20 ms', value: 20 },
      { label: '50 ms', value: 50 },
      { label: '100 ms', value: 100 },
    ],
    durationSec: [
      { label: '30 sec', value: 30 },
      { label: '60 sec', value: 60 },
      { label: '120 sec', value: 120 },
      { label: '300 sec', value: 300 },
    ],
  },

  defaultConfig: {
    segment: 'RUN_ALL',
    client: client1,
    assetPoint: { label: '192.168.1.50', ip: '192.168.1.50' },
    server: { label: '192.168.1.100', ip: '192.168.1.100', port: 5001 },
    packetSizes: { selected: ['10KB', '20KB', '50KB', '100KB'] },
    countPerSize: 200,
    intervalMs: 20,
    durationSec: 60,
  },

  tableRows: [
    {
      packetSizeLabel: '10 KB',
      sent: 200,
      received: 198,
      lossPct: 1.0,
      rttAvgMs: 5.2,
      rttP95Ms: 7.8,
      jitterMs: 1.5,
      throughputMbps: 90,
    },
    {
      packetSizeLabel: '20 KB',
      sent: 200,
      received: 195,
      lossPct: 2.5,
      rttAvgMs: 8.4,
      rttP95Ms: 12.1,
      jitterMs: 2.8,
      throughputMbps: 140,
    },
    {
      packetSizeLabel: '50 KB',
      sent: 200,
      received: 197,
      lossPct: 1.5,
      rttAvgMs: 10.6,
      rttP95Ms: 14.4,
      jitterMs: 3.1,
      throughputMbps: 210,
    },
    {
      packetSizeLabel: '100 KB',
      sent: 200,
      received: 196,
      lossPct: 2.0,
      rttAvgMs: 14.8,
      rttP95Ms: 20.2,
      jitterMs: 4.2,
      throughputMbps: 320,
    },
  ],

  charts: {
    rttAndLoss: {
      y1Label: 'RTT (ms)',
      y2Label: 'Loss (%)',
      series: [
        {
          name: 'RTT',
          points: [
            { xLabel: 't1', value: 6 },
            { xLabel: 't2', value: 7 },
            { xLabel: 't3', value: 9 },
            { xLabel: 't4', value: 12 },
            { xLabel: 't5', value: 15 },
            { xLabel: 't6', value: 16 },
          ],
        },
        {
          name: 'Loss',
          points: [
            { xLabel: 't1', value: 2.0 },
            { xLabel: 't2', value: 1.2 },
            { xLabel: 't3', value: 2.8 },
            { xLabel: 't4', value: 1.0 },
            { xLabel: 't5', value: 1.6 },
            { xLabel: 't6', value: 2.2 },
          ],
        },
      ],
    },

    throughputVsPacket: {
      series: [
        {
          name: 'Throughput',
          points: [
            { xLabel: '10 KB', value: 90 },
            { xLabel: '50 KB', value: 210 },
            { xLabel: '100 KB', value: 320 },
          ],
        },
      ],
    },
  },

  logs: [
    { time: '12:32:11', message: 'Resolving server IP…', level: 'info' },
    { time: '12:32:12', message: 'Ping 192.168.1.109 — OK', level: 'success' },
  ],
};
