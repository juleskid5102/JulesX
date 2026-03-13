/**
 * Jules Studio — Site Configuration
 * SITE_CONFIG values (extracted from Stitch analysis)
 * Centralized so they're easy to update without touching components.
 */

export const SITE = {
  name: 'Jules Studio',
  tagline: 'Xây dựng sự xuất sắc trong kỹ thuật số thông qua phong cách tối giản và thiết kế chức năng.',
  copyright: (year = new Date().getFullYear()) =>
    `© ${year} Jules Studio. Mọi quyền được bảo lưu.`,
} as const

export const CONTACT = {
  email: 'hello@jules.studio',
  phone: '+84 (0) 900 123 456',
  address: 'TP. Hồ Chí Minh, Việt Nam',
} as const

export const SOCIAL = {
  dribbble: { label: 'DRIBBBLE', href: 'https://dribbble.com/julesstudio' },
  behance: { label: 'BEHANCE', href: 'https://behance.net/julesstudio' },
  linkedin: { label: 'LINKEDIN', href: 'https://linkedin.com/company/julesstudio' },
} as const

export const NAV_LINKS = [
  { label: 'Dự Án', href: '/du-an' },
  { label: 'Dịch Vụ', href: '/dich-vu' },
  { label: 'Báo Giá', href: '/bao-gia' },
  { label: 'Liên Hệ', href: '/#lien-he' },
] as const

export interface Project {
  id: string
  title: string
  category: string
  year: string
  image: string
  colSpan: number
  aspect: string
  showArrow: boolean
  // Detail fields
  type: string
  date: string
  field: string
  description: string
  challenge: string
  solution: string
  duration: string
  stack: string
  lighthouse: string
  gallery: string[]
  techTags: string[]
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Hệ Thống Quản Lý Phòng Khám',
    category: 'Web App',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADEpF7FExzTpaPrrT0HabgEEb0yrnluzOVxWs0G--PnX7d00G-NKiaN7Hc0lVsgqqMz-okN2UFDFyr3kWtA5ipDALbQIzaeiHRIZgNLjMu0LgzX3ckP1o3AxWzAX6kwiy38_8et_lehdH19Gmc0KAX8a6VUH4rBcwgN24m260AREKzegxbh-aowuha6WUBtP5XmIBeEk4eru1TGHUmpg_KBoeTCUhdKN078xNoW28wuGrOsUKKUXoG3DmtMI2-lVjfwQimhwJMXmGh',
    colSpan: 7,
    aspect: 'aspect-video',
    showArrow: true,
    type: 'Web Application',
    date: 'Tháng 1, 2024',
    field: 'Healthcare / Quản lý',
    description: 'Hệ thống quản lý phòng khám toàn diện, giúp bác sĩ và nhân viên y tế theo dõi lịch hẹn, hồ sơ bệnh nhân và quy trình khám bệnh một cách hiệu quả. Giao diện tối giản giúp tập trung vào trải nghiệm người dùng.',
    challenge: 'Số hóa quy trình quản lý y tế phức tạp với hàng chục loại biểu mẫu, đảm bảo tính bảo mật dữ liệu nhạy cảm và khả năng truy cập nhanh trong giờ cao điểm.',
    solution: 'Áp dụng kiến trúc module với role-based access control. Tích hợp Firestore realtime cho cập nhật tức thì và thiết kế responsive-first đảm bảo sử dụng dễ dàng trên tablet trong phòng khám.',
    duration: '8 Tuần',
    stack: 'React + Firebase',
    lighthouse: '95',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgrBfQL8wa9mlDuQcDEiVY1va5cf3AQyWVmVB62H9-V5wPcEYqUt5MJNh7PDouDnXpPqYET9MaCBV3hrCXRLt0RqHFSZG7GG2-XcR1Sd6fG7c-HorqmFM1JW0FnlJHX_uoH_gtHXswhUC3pwmU-CnRW2IzAcy78S0FiZ1V23oWBPWzhQY138MeVCgEJg6zyiO8q529icTv7E7dJYxMaxbUPXmq4nbkPD1Xibf6IdgjVvx9HOksPZkkVg3_FgDZZ779xFw90K9agXuq',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFM96t-SwHY6Gg0wWiemUygdmCGLxqi2xvlTsmmjupalqrtAyVV706fR7I58QhBXK7KMrwaqTnPIEDVPWHxR34hjxZGxCbjxg-Zq_wjtU8xqSwtK-hg720pZP1hW8WcIjsU5ebNIZh4fz-sPCG2UcQjQYgEZh9brIaDOxJh_CFu4HYpN78RQ8vMHW5HkxeqrTmZRyS3JkRmZXUg17Jzg1Tw8XWAuHRgDVHS6kuOmCfeDFz1elPFIdhdcXg8E8jV8240FokXke5pFx9',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtoThaF9RbSxnHXnjEE1s1ANEcvZCg94vuqDKu7IouTU3AN1TYeBqBi-hO97CRKQnnPnDS9ecnNY9lP2C5zWMBvZ97qQ5S6VV80MSqaZlOA_Vh-sr14fa8th2FZF9rIvSCJ-kt0OUYpi-7NbrcImsQCVSQh5ncetlA05az1GfvAHUQy93vK_HkHq5TyGi3a6ugqzb-qQxgpcifQtYrM8pP9n32ZtJZjTUD2xHWWU88_8YCwJ8C04HwTBCLUl5_AkK5WajsynmsS-lE',
    ],
    techTags: ['REACT', 'FIREBASE', 'TAILWIND CSS', 'CLOUDFLARE'],
  },
  {
    id: '2',
    title: 'Website Thương Mại Điện Tử',
    category: 'E-commerce',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyj9dY0glbafUNeKeg4uoIyWtgO77A6W25jJFmFNUbfoZMUI6-0Gm-6F56PsPxMyKItZ3BMyv8kU2tmESciqIeB8TButwz7-LL-xpk15Hf1tOcbZZxDPo5sxX97zTEU91PRdbCVx0iGt-PiaSo99LEGERRBjwlhrMynjYSc7auk1nuRP5rZw3fEAYB_NXSCeiJSKYKJD_qAUEtU4eB67-haz1tKEmJm4G0-CIuNZwvAc3eZqRbioCAoqN_NELGAxFcUnwA5hWtwF2',
    colSpan: 5,
    aspect: 'aspect-video md:aspect-square',
    showArrow: false,
    type: 'E-commerce',
    date: 'Tháng 9, 2023',
    field: 'Thương mại điện tử',
    description: 'Nền tảng bán hàng trực tuyến hiện đại với giỏ hàng thông minh, thanh toán nhanh và quản lý kho hàng realtime. Tối ưu trải nghiệm mua sắm trên mọi thiết bị.',
    challenge: 'Xây dựng trải nghiệm mua sắm mượt mà trên cả mobile và desktop, tích hợp nhiều phương thức thanh toán và đồng bộ kho hàng realtime.',
    solution: 'Sử dụng Next.js cho SSR/SEO tối ưu, Stripe cho thanh toán an toàn, và Firestore listeners cho đồng bộ dữ liệu tức thì.',
    duration: '10 Tuần',
    stack: 'Next.js + Stripe',
    lighthouse: '92',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyj9dY0glbafUNeKeg4uoIyWtgO77A6W25jJFmFNUbfoZMUI6-0Gm-6F56PsPxMyKItZ3BMyv8kU2tmESciqIeB8TButwz7-LL-xpk15Hf1tOcbZZxDPo5sxX97zTEU91PRdbCVx0iGt-PiaSo99LEGERRBjwlhrMynjYSc7auk1nuRP5rZw3fEAYB_NXSCeiJSKYKJD_qAUEtU4eB67-haz1tKEmJm4G0-CIuNZwvAc3eZqRbioCAoqN_NELGAxFcUnwA5hWtwF2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADEpF7FExzTpaPrrT0HabgEEb0yrnluzOVxWs0G--PnX7d00G-NKiaN7Hc0lVsgqqMz-okN2UFDFyr3kWtA5ipDALbQIzaeiHRIZgNLjMu0LgzX3ckP1o3AxWzAX6kwiy38_8et_lehdH19Gmc0KAX8a6VUH4rBcwgN24m260AREKzegxbh-aowuha6WUBtP5XmIBeEk4eru1TGHUmpg_KBoeTCUhdKN078xNoW28wuGrOsUKKUXoG3DmtMI2-lVjfwQimhwJMXmGh',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtoThaF9RbSxnHXnjEE1s1ANEcvZCg94vuqDKu7IouTU3AN1TYeBqBi-hO97CRKQnnPnDS9ecnNY9lP2C5zWMBvZ97qQ5S6VV80MSqaZlOA_Vh-sr14fa8th2FZF9rIvSCJ-kt0OUYpi-7NbrcImsQCVSQh5ncetlA05az1GfvAHUQy93vK_HkHq5TyGi3a6ugqzb-qQxgpcifQtYrM8pP9n32ZtJZjTUD2xHWWU88_8YCwJ8C04HwTBCLUl5_AkK5WajsynmsS-lE',
    ],
    techTags: ['NEXT.JS', 'STRIPE', 'FIREBASE', 'TAILWIND CSS'],
  },
  {
    id: '3',
    title: 'Landing Page Startup',
    category: 'Landing Page',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQaGu2ZDMz9aQxughr2aigN5lPK4c6SfaWHkend5oMj9Li69ywFtpbZqYbXJDq-ZxRC2txmg1NeYTlBNX5ggZSeDtidLeM6l3KePlDd_R_vMcnMgl9kCyZQEEiHePcL7_ZuMLkzd_VtPKsD7jgO-mdAAbVu1aCwGrCDSO4O3ghtjML2hlPUG6IZX9Y1JG109008cbKvYShfW0Y5QYYe8zJemqwqFvIUyo1EUFEsDOzEQf_3cizmiTJYIfYO05_-rleKtTPPVUE5nyn',
    colSpan: 5,
    aspect: 'aspect-video md:aspect-square',
    showArrow: false,
    type: 'Landing Page',
    date: 'Tháng 6, 2023',
    field: 'Startup / SaaS',
    description: 'Trang đích với conversion rate cao cho startup công nghệ. Kết hợp animation tinh tế, typography mạnh mẽ và CTA rõ ràng để tối đa hóa tỷ lệ chuyển đổi.',
    challenge: 'Truyền tải được giá trị sản phẩm phức tạp trong 5 giây đầu tiên, khi người dùng quyết định ở lại hay rời đi.',
    solution: 'Thiết kế hero section với headline cực mạnh, social proof ngay dưới fold, và progressive disclosure cho thông tin chi tiết.',
    duration: '3 Tuần',
    stack: 'React + Vite',
    lighthouse: '99',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQaGu2ZDMz9aQxughr2aigN5lPK4c6SfaWHkend5oMj9Li69ywFtpbZqYbXJDq-ZxRC2txmg1NeYTlBNX5ggZSeDtidLeM6l3KePlDd_R_vMcnMgl9kCyZQEEiHePcL7_ZuMLkzd_VtPKsD7jgO-mdAAbVu1aCwGrCDSO4O3ghtjML2hlPUG6IZX9Y1JG109008cbKvYShfW0Y5QYYe8zJemqwqFvIUyo1EUFEsDOzEQf_3cizmiTJYIfYO05_-rleKtTPPVUE5nyn',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFM96t-SwHY6Gg0wWiemUygdmCGLxqi2xvlTsmmjupalqrtAyVV706fR7I58QhBXK7KMrwaqTnPIEDVPWHxR34hjxZGxCbjxg-Zq_wjtU8xqSwtK-hg720pZP1hW8WcIjsU5ebNIZh4fz-sPCG2UcQjQYgEZh9brIaDOxJh_CFu4HYpN78RQ8vMHW5HkxeqrTmZRyS3JkRmZXUg17Jzg1Tw8XWAuHRgDVHS6kuOmCfeDFz1elPFIdhdcXg8E8jV8240FokXke5pFx9',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgrBfQL8wa9mlDuQcDEiVY1va5cf3AQyWVmVB62H9-V5wPcEYqUt5MJNh7PDouDnXpPqYET9MaCBV3hrCXRLt0RqHFSZG7GG2-XcR1Sd6fG7c-HorqmFM1JW0FnlJHX_uoH_gtHXswhUC3pwmU-CnRW2IzAcy78S0FiZ1V23oWBPWzhQY138MeVCgEJg6zyiO8q529icTv7E7dJYxMaxbUPXmq4nbkPD1Xibf6IdgjVvx9HOksPZkkVg3_FgDZZ779xFw90K9agXuq',
    ],
    techTags: ['REACT', 'VITE', 'GSAP', 'TAILWIND CSS'],
  },
  {
    id: '4',
    title: 'Dashboard Phân Tích Dữ Liệu',
    category: 'Dashboard',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2SG5JYPvzjI4_5DMUgP-EEBZ8LXmtX53-0-fkaJcXygd5d3BIeD_ZT5x0w7xZtxJSMbntx2zfGPHVdTgNVPhYCWTW0EyFqFEPCHXhPHZTl1xAI5sWOw4iHO4wBqSQEPQlzMFXiC_YEy1kIRwprb1PQ18klSwaZ3Aa6F757HI39happYhCDOGMyUrjBVGAOG0B4hh5L-vg22jKu7opihZmdrHb75EgceDk2B_d-TdNwZ4HlkfcmN9v7KdxrW4W4FSH_CAOZva1rGQX',
    colSpan: 7,
    aspect: 'aspect-video',
    showArrow: true,
    type: 'Dashboard',
    date: 'Tháng 3, 2024',
    field: 'Analytics / BI',
    description: 'Bảng điều khiển phân tích dữ liệu realtime với biểu đồ tương tác, bộ lọc nâng cao và khả năng xuất báo cáo tự động. Thiết kế tối giản giúp tập trung vào dữ liệu.',
    challenge: 'Hiển thị khối lượng dữ liệu lớn mà không gây quá tải nhận thức, đồng thời đảm bảo hiệu suất rendering mượt mà với charts realtime.',
    solution: 'Áp dụng bento grid layout cho flexibility, virtualized lists cho dữ liệu lớn, và WebSocket cho real-time data streaming.',
    duration: '12 Tuần',
    stack: 'React + D3.js',
    lighthouse: '88',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2SG5JYPvzjI4_5DMUgP-EEBZ8LXmtX53-0-fkaJcXygd5d3BIeD_ZT5x0w7xZtxJSMbntx2zfGPHVdTgNVPhYCWTW0EyFqFEPCHXhPHZTl1xAI5sWOw4iHO4wBqSQEPQlzMFXiC_YEy1kIRwprb1PQ18klSwaZ3Aa6F757HI39happYhCDOGMyUrjBVGAOG0B4hh5L-vg22jKu7opihZmdrHb75EgceDk2B_d-TdNwZ4HlkfcmN9v7KdxrW4W4FSH_CAOZva1rGQX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyj9dY0glbafUNeKeg4uoIyWtgO77A6W25jJFmFNUbfoZMUI6-0Gm-6F56PsPxMyKItZ3BMyv8kU2tmESciqIeB8TButwz7-LL-xpk15Hf1tOcbZZxDPo5sxX97zTEU91PRdbCVx0iGt-PiaSo99LEGERRBjwlhrMynjYSc7auk1nuRP5rZw3fEAYB_NXSCeiJSKYKJD_qAUEtU4eB67-haz1tKEmJm4G0-CIuNZwvAc3eZqRbioCAoqN_NELGAxFcUnwA5hWtwF2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtoThaF9RbSxnHXnjEE1s1ANEcvZCg94vuqDKu7IouTU3AN1TYeBqBi-hO97CRKQnnPnDS9ecnNY9lP2C5zWMBvZ97qQ5S6VV80MSqaZlOA_Vh-sr14fa8th2FZF9rIvSCJ-kt0OUYpi-7NbrcImsQCVSQh5ncetlA05az1GfvAHUQy93vK_HkHq5TyGi3a6ugqzb-qQxgpcifQtYrM8pP9n32ZtJZjTUD2xHWWU88_8YCwJ8C04HwTBCLUl5_AkK5WajsynmsS-lE',
    ],
    techTags: ['REACT', 'D3.JS', 'FIREBASE', 'WEBSOCKET'],
  },
  {
    id: '5',
    title: 'Ứng Dụng Đặt Lịch',
    category: 'Web App',
    year: '2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJjYBgvxNm_3-j-1jLhxAyev93e_Wf6jZNS74xYG_7ZH0TqGuy4sbwyBZCtdAwRm3DFIWY9gwHIF_eP40ovE9y8vM9Ez0KTxBUdSqiZEcjvkTNgHwKK_FjS9f8BQkUWfYP1D4ofe8cOzdIAu8TL5xC2JoMWJZDD3HThe7qeAS7JTugtCGZh5jKZBtrQjOfa2xX3LR-h1umo463fTbqmX_qgsaB3QC-6o6v-gu6rK9KzxNI0zIX7exI8pMArj2w1KlTUv3pZKVBkHQ',
    colSpan: 4,
    aspect: 'aspect-square',
    showArrow: false,
    type: 'Web Application',
    date: 'Tháng 11, 2022',
    field: 'SaaS / Productivity',
    description: 'Ứng dụng đặt lịch hẹn thông minh với calendar drag-and-drop, gửi nhắc nhở tự động qua email/SMS, và tích hợp Google Calendar.',
    challenge: 'Xử lý conflict resolution khi nhiều người cùng đặt lịch, và tạo UX đơn giản cho cả người đặt lẫn người nhận lịch.',
    solution: 'Sử dụng optimistic UI updates, transaction-based booking để tránh double-booking, và progressive disclosure cho form đặt lịch.',
    duration: '6 Tuần',
    stack: 'React + Node.js',
    lighthouse: '96',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJjYBgvxNm_3-j-1jLhxAyev93e_Wf6jZNS74xYG_7ZH0TqGuy4sbwyBZCtdAwRm3DFIWY9gwHIF_eP40ovE9y8vM9Ez0KTxBUdSqiZEcjvkTNgHwKK_FjS9f8BQkUWfYP1D4ofe8cOzdIAu8TL5xC2JoMWJZDD3HThe7qeAS7JTugtCGZh5jKZBtrQjOfa2xX3LR-h1umo463fTbqmX_qgsaB3QC-6o6v-gu6rK9KzxNI0zIX7exI8pMArj2w1KlTUv3pZKVBkHQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgrBfQL8wa9mlDuQcDEiVY1va5cf3AQyWVmVB62H9-V5wPcEYqUt5MJNh7PDouDnXpPqYET9MaCBV3hrCXRLt0RqHFSZG7GG2-XcR1Sd6fG7c-HorqmFM1JW0FnlJHX_uoH_gtHXswhUC3pwmU-CnRW2IzAcy78S0FiZ1V23oWBPWzhQY138MeVCgEJg6zyiO8q529icTv7E7dJYxMaxbUPXmq4nbkPD1Xibf6IdgjVvx9HOksPZkkVg3_FgDZZ779xFw90K9agXuq',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFM96t-SwHY6Gg0wWiemUygdmCGLxqi2xvlTsmmjupalqrtAyVV706fR7I58QhBXK7KMrwaqTnPIEDVPWHxR34hjxZGxCbjxg-Zq_wjtU8xqSwtK-hg720pZP1hW8WcIjsU5ebNIZh4fz-sPCG2UcQjQYgEZh9brIaDOxJh_CFu4HYpN78RQ8vMHW5HkxeqrTmZRyS3JkRmZXUg17Jzg1Tw8XWAuHRgDVHS6kuOmCfeDFz1elPFIdhdcXg8E8jV8240FokXke5pFx9',
    ],
    techTags: ['REACT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND CSS'],
  },
  {
    id: '6',
    title: 'Portfolio Agency',
    category: 'Website',
    year: '2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqCrDFg3B2WHMfQAanMVyqDHbGJnT1h4zuLNpu29zHX2rEKTp1Wm7RsBuC4WOp0R9xY9HET4NFd64jJAVkDI6oR3HlkHsveaouWN2hYNzlsULKRBhKUbpENze2i-nH6DqiVQE16yCuiyTvCYO29UIDKv-rcoweOX4rdOBOFTFvwwdB1gyNG7WiagWxNY_e8MaxyACgAAfcxMLdPU-p-K10MwrfyYvK9yueJxQ-6rf3l_u8RN3WSeLgU9jcnJVmAMK8eDxnWf5bYDwP',
    colSpan: 4,
    aspect: 'aspect-square',
    showArrow: false,
    type: 'Website',
    date: 'Tháng 5, 2022',
    field: 'Creative Agency',
    description: 'Website portfolio cho agency sáng tạo với animation scroll-driven ấn tượng, gallery hình ảnh full-screen và thiết kế typography-first.',
    challenge: 'Thể hiện được phong cách sáng tạo của agency thông qua chính website của họ, tạo ấn tượng mạnh ngay từ giây đầu tiên.',
    solution: 'Sử dụng GSAP ScrollTrigger cho scroll animations, oversized typography Syne 800, và grayscale-to-color transition làm signature effect.',
    duration: '4 Tuần',
    stack: 'React + GSAP',
    lighthouse: '97',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqCrDFg3B2WHMfQAanMVyqDHbGJnT1h4zuLNpu29zHX2rEKTp1Wm7RsBuC4WOp0R9xY9HET4NFd64jJAVkDI6oR3HlkHsveaouWN2hYNzlsULKRBhKUbpENze2i-nH6DqiVQE16yCuiyTvCYO29UIDKv-rcoweOX4rdOBOFTFvwwdB1gyNG7WiagWxNY_e8MaxyACgAAfcxMLdPU-p-K10MwrfyYvK9yueJxQ-6rf3l_u8RN3WSeLgU9jcnJVmAMK8eDxnWf5bYDwP',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyj9dY0glbafUNeKeg4uoIyWtgO77A6W25jJFmFNUbfoZMUI6-0Gm-6F56PsPxMyKItZ3BMyv8kU2tmESciqIeB8TButwz7-LL-xpk15Hf1tOcbZZxDPo5sxX97zTEU91PRdbCVx0iGt-PiaSo99LEGERRBjwlhrMynjYSc7auk1nuRP5rZw3fEAYB_NXSCeiJSKYKJD_qAUEtU4eB67-haz1tKEmJm4G0-CIuNZwvAc3eZqRbioCAoqN_NELGAxFcUnwA5hWtwF2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADEpF7FExzTpaPrrT0HabgEEb0yrnluzOVxWs0G--PnX7d00G-NKiaN7Hc0lVsgqqMz-okN2UFDFyr3kWtA5ipDALbQIzaeiHRIZgNLjMu0LgzX3ckP1o3AxWzAX6kwiy38_8et_lehdH19Gmc0KAX8a6VUH4rBcwgN24m260AREKzegxbh-aowuha6WUBtP5XmIBeEk4eru1TGHUmpg_KBoeTCUhdKN078xNoW28wuGrOsUKKUXoG3DmtMI2-lVjfwQimhwJMXmGh',
    ],
    techTags: ['REACT', 'GSAP', 'VITE', 'CLOUDFLARE'],
  },
  {
    id: '7',
    title: 'LUMEN FLOW',
    category: '3D Design',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGv-HmnXHwmclSidcH4Vm0AouP4Rh_3mSmMWOvQbF2C7XPOsmrNcIe9ZRCBL2hqoCwRRgIdKu1BcimtxryPK0ybpFWpwmi8m7Tei0XZTjKCOPeJtJ7IBkXhoSRydtJiWD05iw4uB6vbJ1GbgMb1_lsWyOZSkwyzGUYmMVXZmXfd-niR5RSeaKESU6HLU7SOYlikRlSHxm_GTpltZsdyTLJtd6OE1LPqUxVqrttVWSTc-9uZF8OxwuYq84ziBBBCPWAqOKVtpUIgk0M',
    colSpan: 4,
    aspect: 'aspect-square',
    showArrow: false,
    type: '3D Design',
    date: 'Tháng 8, 2023',
    field: '3D / Motion Graphics',
    description: 'Trải nghiệm 3D tương tác với hiệu ứng ánh sáng động, particle systems và camera transitions mượt mà. Kết hợp nghệ thuật và công nghệ trong một showcase ấn tượng.',
    challenge: 'Tạo trải nghiệm 3D mượt mà trên web mà không ảnh hưởng đến hiệu suất, đồng thời đảm bảo responsive trên mọi thiết bị.',
    solution: 'Sử dụng Three.js với WebGL shaders tùy chỉnh, LOD (Level of Detail) cho performance, và post-processing effects cho visual impact.',
    duration: '5 Tuần',
    stack: 'Three.js + WebGL',
    lighthouse: '90',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGv-HmnXHwmclSidcH4Vm0AouP4Rh_3mSmMWOvQbF2C7XPOsmrNcIe9ZRCBL2hqoCwRRgIdKu1BcimtxryPK0ybpFWpwmi8m7Tei0XZTjKCOPeJtJ7IBkXhoSRydtJiWD05iw4uB6vbJ1GbgMb1_lsWyOZSkwyzGUYmMVXZmXfd-niR5RSeaKESU6HLU7SOYlikRlSHxm_GTpltZsdyTLJtd6OE1LPqUxVqrttVWSTc-9uZF8OxwuYq84ziBBBCPWAqOKVtpUIgk0M',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqCrDFg3B2WHMfQAanMVyqDHbGJnT1h4zuLNpu29zHX2rEKTp1Wm7RsBuC4WOp0R9xY9HET4NFd64jJAVkDI6oR3HlkHsveaouWN2hYNzlsULKRBhKUbpENze2i-nH6DqiVQE16yCuiyTvCYO29UIDKv-rcoweOX4rdOBOFTFvwwdB1gyNG7WiagWxNY_e8MaxyACgAAfcxMLdPU-p-K10MwrfyYvK9yueJxQ-6rf3l_u8RN3WSeLgU9jcnJVmAMK8eDxnWf5bYDwP',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJjYBgvxNm_3-j-1jLhxAyev93e_Wf6jZNS74xYG_7ZH0TqGuy4sbwyBZCtdAwRm3DFIWY9gwHIF_eP40ovE9y8vM9Ez0KTxBUdSqiZEcjvkTNgHwKK_FjS9f8BQkUWfYP1D4ofe8cOzdIAu8TL5xC2JoMWJZDD3HThe7qeAS7JTugtCGZh5jKZBtrQjOfa2xX3LR-h1umo463fTbqmX_qgsaB3QC-6o6v-gu6rK9KzxNI0zIX7exI8pMArj2w1KlTUv3pZKVBkHQ',
    ],
    techTags: ['THREE.JS', 'WEBGL', 'GSAP', 'GLSL'],
  },
]
