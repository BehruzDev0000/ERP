// Mock data for development when server is not available

export const USE_MOCK_DATA = true; // Set to false when server is working

export const mockStacks = [
  { id: 1, name: "Frontend", description: "HTML, CSS, JavaScript, React, Vue.js, Angular va boshqa frontend texnologiyalari" },
  { id: 2, name: "Backend", description: "Node.js, Express, NestJS, PostgreSQL, MongoDB va server tomonidagi texnologiyalar" },
  { id: 3, name: "Mobile", description: "React Native, Flutter, Swift, Kotlin - mobil ilovalar yaratish" },
  { id: 4, name: "DevOps", description: "Docker, Kubernetes, AWS, CI/CD - infratuzilma va avtomatlashtirish" },
  { id: 5, name: "Python", description: "Django, FastAPI, Machine Learning, Data Science" },
  { id: 6, name: "UI/UX Design", description: "Figma, Adobe XD, Sketch - foydalanuvchi interfeysi dizayni" },
];

export const mockRooms = [
  { id: 1, name: "101-xona", capacity: 20 },
  { id: 2, name: "102-xona", capacity: 15 },
  { id: 3, name: "103-xona", capacity: 30 },
  { id: 4, name: "201-xona", capacity: 25 },
  { id: 5, name: "202-xona", capacity: 18 },
  { id: 6, name: "Konferens zal", capacity: 50 },
];

export const mockTeachers = [
  { id: 1, firstName: "Akmal", lastName: "Karimov", email: "akmal@example.com", phone: "+998901234567", stack: { id: 1, name: "Frontend" }, groups: [{ id: 1 }, { id: 2 }] },
  { id: 2, firstName: "Dilshod", lastName: "Rahimov", email: "dilshod@example.com", phone: "+998901234568", stack: { id: 2, name: "Backend" }, groups: [{ id: 3 }] },
  { id: 3, firstName: "Shaxzod", lastName: "Aliyev", email: "shaxzod@example.com", phone: "+998901234569", stack: { id: 3, name: "Mobile" }, groups: [{ id: 4 }, { id: 5 }] },
  { id: 4, firstName: "Nodira", lastName: "Yusupova", email: "nodira@example.com", phone: "+998901234570", stack: { id: 5, name: "Python" }, groups: [] },
  { id: 5, firstName: "Jasur", lastName: "Toshmatov", email: "jasur@example.com", phone: "+998901234571", stack: { id: 4, name: "DevOps" }, groups: [{ id: 6 }] },
];

export const mockStudents = [
  { id: 1, firstName: "Ali", lastName: "Valiyev", email: "ali@example.com", phone: "+998911111111", stacks: [{ id: 1, name: "Frontend" }], groups: [{ id: 1 }] },
  { id: 2, firstName: "Olim", lastName: "Kamolov", email: "olim@example.com", phone: "+998911111112", stacks: [{ id: 1, name: "Frontend" }, { id: 2, name: "Backend" }], groups: [{ id: 1 }, { id: 3 }] },
  { id: 3, firstName: "Nilufar", lastName: "Sodiqova", email: "nilufar@example.com", phone: "+998911111113", stacks: [{ id: 2, name: "Backend" }], groups: [{ id: 3 }] },
  { id: 4, firstName: "Aziz", lastName: "Mahmudov", email: "aziz@example.com", phone: "+998911111114", stacks: [{ id: 3, name: "Mobile" }], groups: [{ id: 4 }] },
  { id: 5, firstName: "Madina", lastName: "Rashidova", email: "madina@example.com", phone: "+998911111115", stacks: [{ id: 5, name: "Python" }], groups: [] },
  { id: 6, firstName: "Sardor", lastName: "Nurmatov", email: "sardor@example.com", phone: "+998911111116", stacks: [{ id: 1, name: "Frontend" }], groups: [{ id: 2 }] },
  { id: 7, firstName: "Zarina", lastName: "Bekmurodova", email: "zarina@example.com", phone: "+998911111117", stacks: [{ id: 4, name: "DevOps" }], groups: [{ id: 6 }] },
  { id: 8, firstName: "Jamshid", lastName: "Ergashev", email: "jamshid@example.com", phone: "+998911111118", stacks: [{ id: 2, name: "Backend" }], groups: [{ id: 3 }] },
];

export const mockGroups = [
  { id: 1, name: "Frontend-01", stack: { id: 1, name: "Frontend" }, teacher: { id: 1, firstName: "Akmal", lastName: "Karimov" }, status: "active", students: [{ id: 1 }, { id: 2 }] },
  { id: 2, name: "Frontend-02", stack: { id: 1, name: "Frontend" }, teacher: { id: 1, firstName: "Akmal", lastName: "Karimov" }, status: "active", students: [{ id: 6 }] },
  { id: 3, name: "Backend-01", stack: { id: 2, name: "Backend" }, teacher: { id: 2, firstName: "Dilshod", lastName: "Rahimov" }, status: "active", students: [{ id: 2 }, { id: 3 }, { id: 8 }] },
  { id: 4, name: "Mobile-01", stack: { id: 3, name: "Mobile" }, teacher: { id: 3, firstName: "Shaxzod", lastName: "Aliyev" }, status: "pending", students: [{ id: 4 }] },
  { id: 5, name: "Mobile-02", stack: { id: 3, name: "Mobile" }, teacher: { id: 3, firstName: "Shaxzod", lastName: "Aliyev" }, status: "completed", students: [] },
  { id: 6, name: "DevOps-01", stack: { id: 4, name: "DevOps" }, teacher: { id: 5, firstName: "Jasur", lastName: "Toshmatov" }, status: "active", students: [{ id: 7 }] },
];

// Helper function to filter mock data
export const filterMockData = (data: any[], params: any) => {
  let result = [...data];
  
  if (params?.name) {
    const searchName = params.name.toLowerCase();
    result = result.filter(item => {
      const itemName = item.name || `${item.firstName || ''} ${item.lastName || ''}`;
      return itemName.toLowerCase().includes(searchName);
    });
  }
  
  if (params?.stackId) {
    result = result.filter(item => {
      if (item.stack) return item.stack.id === Number(params.stackId);
      if (item.stacks) return item.stacks.some((s: any) => s.id === Number(params.stackId));
      return true;
    });
  }
  
  if (params?.teacherId) {
    result = result.filter(item => {
      if (item.teacher) return item.teacher.id === Number(params.teacherId);
      return true;
    });
  }
  
  return result;
};

// Get mock data by URL
export const getMockDataByUrl = (url: string, params?: any): any[] => {
  let data: any[] = [];
  
  if (url.includes('/stacks')) {
    data = mockStacks;
  } else if (url.includes('/rooms')) {
    data = mockRooms;
  } else if (url.includes('/teachers')) {
    data = mockTeachers;
  } else if (url.includes('/students')) {
    data = mockStudents;
  } else if (url.includes('/groups')) {
    data = mockGroups;
  }
  
  return filterMockData(data, params);
};

// Get mock data by ID
export const getMockDataById = (url: string, id: string | undefined): any => {
  if (!id) return null;
  const numId = Number(id);
  
  if (url.includes('/stacks')) {
    return mockStacks.find(item => item.id === numId);
  } else if (url.includes('/rooms')) {
    return mockRooms.find(item => item.id === numId);
  } else if (url.includes('/teachers')) {
    return mockTeachers.find(item => item.id === numId);
  } else if (url.includes('/students')) {
    return mockStudents.find(item => item.id === numId);
  } else if (url.includes('/groups')) {
    return mockGroups.find(item => item.id === numId);
  }
  
  return null;
};
