export type Language = 'en' | 'ms'

type Translations = {
  [key in Language]: {
    // Navigation
    navHome: string
    navAgents: string
    navSave: string
    navReports: string
    navPay: string

    // Dashboard
    dashGreeting: string
    dashStatus: string
    dashStrong: string
    dashWatch: string
    dashBalance: string
    dashSafeDaily: string
    dashLimitsImpulse: string
    dashNextIn: string
    dashDays: string

    // Dashboard Quick Actions
    actionTransaction: string
    actionTransfer: string
    actionBills: string
    actionShield: string

    // Dashboard Sections
    sectionHealthCheck: string
    riskCashflow: string
    riskDebtShield: string
    sectionInsights: string
    insightBrokeDate: string
    insightBrokeDesc: string
    insightSavings: string
    insightSavingsDesc: string
    sectionRecent: string
    viewAll: string

    // Resilience Modal
    resModalTitle: string
    resModalExcellent: string
    resModalStable: string
    resModalNeedsAttention: string
    resModalDesc: string
    resModalCashflow: string
    resModalSavings: string
    resModalDebt: string
    resModalAI: string
    resModalAIDesc: string

    // Settings
    settingsPreferences: string
    settingsSmartNotif: string
    settingsDebtAuto: string
    settingsAccount: string
    settingsLanguage: string
    settingsPaymentMethods: string
    settingsProfile: string
    settingsHelp: string
    settingsSecureSession: string
    settingsSignOut: string
    
    // Logout Modal
    logoutReady: string
    logoutDesc: string
    logoutCancel: string
    logoutConfirm: string
    logoutSecuring: string
  }
}

export const t: Translations = {
  en: {
    navHome: "Home",
    navAgents: "Agents",
    navSave: "Save",
    navReports: "Reports",
    navPay: "PAY",

    dashGreeting: "Hi",
    dashStatus: "Status",
    dashStrong: "Strong",
    dashWatch: "Watch",
    dashBalance: "Balance",
    dashSafeDaily: "Safe Daily",
    dashLimitsImpulse: "Limits impulse risk",
    dashNextIn: "Next in",
    dashDays: "days",

    actionTransaction: "Transaction",
    actionTransfer: "Transfer",
    actionBills: "Bills",
    actionShield: "Shield",

    sectionHealthCheck: "Financial Health Check",
    riskCashflow: "Cashflow Risk",
    riskDebtShield: "Debt Shield Score",
    sectionInsights: "Active Insights",
    insightBrokeDate: "Broke Date Warning",
    insightBrokeDesc: "Your current spending pace will lead to a RM0 balance. Activate Budget Guard.",
    insightSavings: "Savings Opportunity",
    insightSavingsDesc: "Saving just RM2.50/day will secure your Laptop Fund by August. Start Auto-Save?",
    sectionRecent: "Recent Activity",
    viewAll: "VIEW ALL",

    resModalTitle: "Resilience Score",
    resModalExcellent: "Excellent",
    resModalStable: "Stable",
    resModalNeedsAttention: "Needs Attention",
    resModalDesc: "Your Resilience Score is the heartbeat of your financial health.",
    resModalCashflow: "Cashflow Safety",
    resModalSavings: "Savings Progress",
    resModalDebt: "Debt Health",
    resModalAI: "AI Recommendation",
    resModalAIDesc: "To reach a 'Strong' 75% score, try keeping your daily expenses under RM15 for the next 3 days. Your Debt Health is currently excellent!",

    settingsPreferences: "Preferences",
    settingsSmartNotif: "Smart Notifications",
    settingsDebtAuto: "Debt Shield Auto-Analyze",
    settingsAccount: "Account",
    settingsLanguage: "Language / Bahasa",
    settingsPaymentMethods: "Payment Methods",
    settingsProfile: "Profile Information",
    settingsHelp: "Help & Support",
    settingsSecureSession: "Secure Session",
    settingsSignOut: "Sign Out securely",

    logoutReady: "Ready to go?",
    logoutDesc: "Your financial data is securely saved. You will need to re-authenticate to access your dashboard.",
    logoutCancel: "Cancel",
    logoutConfirm: "Sign Out",
    logoutSecuring: "Securing...",
  },
  ms: {
    navHome: "Utama",
    navAgents: "Ejen",
    navSave: "Simpan",
    navReports: "Laporan",
    navPay: "BAYAR",

    dashGreeting: "Hai",
    dashStatus: "Status",
    dashStrong: "Kukuh",
    dashWatch: "Awas",
    dashBalance: "Baki",
    dashSafeDaily: "Perbelanjaan Harian",
    dashLimitsImpulse: "Kawal nafsu belanja",
    dashNextIn: "Masuk dlm",
    dashDays: "hari",

    actionTransaction: "Transaksi",
    actionTransfer: "Pindah",
    actionBills: "Bil",
    actionShield: "Pelindung",

    sectionHealthCheck: "Pemeriksaan Kewangan",
    riskCashflow: "Risiko Aliran Tunai",
    riskDebtShield: "Skor Pelindung Hutang",
    sectionInsights: "Maklumat Aktif",
    insightBrokeDate: "Amaran Pokai",
    insightBrokeDesc: "Corak perbelanjaan anda akan menyebabkan baki RM0. Aktifkan Pengawal Bajet.",
    insightSavings: "Peluang Simpanan",
    insightSavingsDesc: "Simpan hanya RM2.50/hari untuk Dana Komputer Riba menjelang Ogos. Mulakan Simpanan Automatik?",
    sectionRecent: "Aktiviti Terkini",
    viewAll: "LIHAT SEMUA",

    resModalTitle: "Skor Ketahanan",
    resModalExcellent: "Cemerlang",
    resModalStable: "Stabil",
    resModalNeedsAttention: "Perlu Perhatian",
    resModalDesc: "Skor Ketahanan adalah nadi kesihatan kewangan anda.",
    resModalCashflow: "Keselamatan Aliran Tunai",
    resModalSavings: "Kemajuan Simpanan",
    resModalDebt: "Kesihatan Hutang",
    resModalAI: "Cadangan AI",
    resModalAIDesc: "Untuk mencapai skor 75% 'Kukuh', cuba kekalkan perbelanjaan harian di bawah RM15 selama 3 hari akan datang. Kesihatan Hutang anda kini cemerlang!",

    settingsPreferences: "Pilihan",
    settingsSmartNotif: "Notifikasi Pintar",
    settingsDebtAuto: "Analisis Auto Pelindung Hutang",
    settingsAccount: "Akaun",
    settingsLanguage: "Language / Bahasa",
    settingsPaymentMethods: "Cara Pembayaran",
    settingsProfile: "Maklumat Profil",
    settingsHelp: "Bantuan & Sokongan",
    settingsSecureSession: "Sesi Selamat",
    settingsSignOut: "Log Keluar dengan selamat",

    logoutReady: "Sedia untuk keluar?",
    logoutDesc: "Data kewangan anda disimpan dengan selamat. Anda perlu log masuk semula untuk mengakses papan pemuka anda.",
    logoutCancel: "Batal",
    logoutConfirm: "Log Keluar",
    logoutSecuring: "Mengamankan...",
  }
}
