
// Convert flat data to hierarchical structure - 8 ĐỜI CHUẨN
export const hierarchicalData = {
  id: "root",
  name: "HỌ PHẠM",
  children: [
    // ĐỜI 1 - Con trực tiếp của HỌ PHẠM
    {
      id: "1",
      name: "Phạm Văn Đại (63 mồ)",
      children: [
        // ĐỜI 2
        {
          id: "3",
          name: "Phạm Văn Dần (65 mồ)",
          children: [
            // ĐỜI 3
            {
              id: "10",
              name: "Đỗ Thị Ngọc (58 mồ)",
              birth: "01/10/1944",
              death: "01/10/2020",
              children: [
                // ĐỜI 4
                {
                  id: "24",
                  name: "Phạm Văn Thắng",
                  birth: "01/10/1944",
                  death: "01/10/2020",
                  children: [
                    // ĐỜI 5
                    {
                      id: "52",
                      name: "Phạm Văn An",
                      birth: "01/10/1944",
                      death: "01/10/2020",
                      children: [
                        // ĐỜI 6
                        {
                          id: "104",
                          name: "Phạm Văn A",
                          birth: "01/10/1944",
                          death: "01/10/2020",
                          children: [
                            // ĐỜI 7
                            {
                              id: "204",
                              name: "Phạm Văn CX",
                              birth: "01/10/1944",
                              death: "01/10/2020",
                              children: [
                                // ĐỜI 8
                                { id: "284", name: "Phạm Văn FZ" },
                                { id: "285", name: "Phạm Thị GA" },
                              ],
                            },
                            {
                              id: "205",
                              name: "Nguyễn Văn CZ",
                              children: [
                                // ĐỜI 8
                                { id: "286", name: "Lê Văn GD" },
                                { id: "287", name: "Lê Thị GE" },
                              ],
                            },
                          ],
                        },
                        {
                          id: "105",
                          name: "Phạm Thị B",
                          children: [
                            // ĐỜI 7
                            {
                              id: "206",
                              name: "Lê Văn DB",
                              children: [
                                // ĐỜI 8
                                { id: "288", name: "Trần Văn GF" },
                                { id: "289", name: "Trần Thị GG" },
                              ],
                            },
                            {
                              id: "207",
                              name: "Nguyễn Thị DA",
                              children: [
                                // ĐỜI 8
                                { id: "290", name: "Phạm Văn GH" },
                                { id: "291", name: "Phạm Thị GI" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "53",
                      name: "Phạm Thị Bình",
                      children: [
                        // ĐỜI 5
                        {
                          id: "106",
                          name: "Nguyễn Văn C",
                          children: [
                            // ĐỜI 6
                            {
                              id: "208",
                              name: "Lê Văn DC",
                              children: [
                                // ĐỜI 7
                                { id: "292", name: "Nguyễn Văn GJ" },
                                { id: "293", name: "Nguyễn Thị GK" },
                              ],
                            },
                            {
                              id: "209",
                              name: "Nguyễn Thị D",
                              children: [
                                // ĐỜI 7
                                { id: "294", name: "Lê Văn GL" },
                                { id: "295", name: "Lê Thị GM" },
                              ],
                            },
                          ],
                        },
                        {
                          id: "107",
                          name: "Nguyễn Thị D",
                          children: [
                            // ĐỜI 6
                            {
                              id: "210",
                              name: "Lê Văn E",
                              children: [
                                // ĐỜI 7
                                { id: "296", name: "Trần Văn GN" },
                                { id: "297", name: "Trần Thị GO" },
                              ],
                            },
                            {
                              id: "211",
                              name: "Lê Thị F",
                              children: [
                                // ĐỜI 7
                                { id: "298", name: "Phạm Văn GP" },
                                { id: "299", name: "Phạm Thị GQ" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "25",
                  name: "Nguyễn Văn Khanh",
                  children: [
                    // ĐỜI 4
                    {
                      id: "54",
                      name: "Nguyễn Văn Cường",
                      children: [
                        // ĐỜI 5
                        {
                          id: "108",
                          name: "Lê Văn E",
                          children: [
                            // ĐỜI 6
                            {
                              id: "212",
                              name: "Phạm Văn DF",
                              children: [
                                // ĐỜI 7
                                { id: "300", name: "Phạm Văn GP" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "55",
                      name: "Nguyễn Thị Dung",
                      children: [], // ĐỜI 4
                    },
                  ],
                },
              ],
            },
            {
              id: "11",
              name: "Nguyễn Thị Bé (58 mồ)",
              children: [
                // ĐỜI 3
                { id: "26", name: "Lê Văn Em", children: [] }, // ĐỜI 4
                { id: "27", name: "Phạm Văn Hào", children: [] }, // ĐỜI 4
              ],
            },
          ],
        },
        {
          id: "6",
          name: "Phạm Văn Hùng (62 mồ)",
          children: [
            // ĐỜI 2
            { id: "16", name: "Nguyễn Thị Hương (53 mồ)", children: [] }, // ĐỜI 3
            { id: "17", name: "Phạm Văn Khoa (57 mồ)", children: [] }, // ĐỜI 3
          ],
        },
        {
          id: "7",
          name: "Nguyễn Thị Mai (58 mồ)",
          children: [
            // ĐỜI 2
            { id: "18", name: "Trần Thị Mai (54 mồ)", children: [] }, // ĐỜI 3
            { id: "19", name: "Phạm Văn Long (58 mồ)", children: [] }, // ĐỜI 3
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Nguyễn Thị Tú (58 mồ)",
      children: [
        // ĐỜI 1
        {
          id: "4",
          name: "Phạm Thị Bích (65 mồ)",
          children: [
            // ĐỜI 2
            {
              id: "12",
              name: "Nguyễn Thị Đạt (60 mồ)",
              children: [
                // ĐỜI 3
                { id: "28", name: "Trần Thị Mai", children: [] }, // ĐỜI 4
                { id: "29", name: "Lê Văn Dũng", children: [] }, // ĐỜI 4
              ],
            },
            { id: "13", name: "Phạm Văn Sơn (55 mồ)", children: [] }, // ĐỜI 3
          ],
        },
        {
          id: "5",
          name: "Nguyễn Thị Đạt (60 mồ)",
          children: [
            // ĐỜI 2
            { id: "14", name: "Lê Thị Hoa (52 mồ)", children: [] }, // ĐỜI 3
            { id: "15", name: "Phạm Văn Minh (56 mồ)", children: [] }, // ĐỜI 3
          ],
        },
        {
          id: "8",
          name: "Phạm Văn Quang (64 mồ)",
          children: [
            // ĐỜI 2
            { id: "20", name: "Lê Thị Dung (55 mồ)", children: [] }, // ĐỜI 3
            { id: "21", name: "Phạm Văn Hùng (59 mồ)", children: [] }, // ĐỜI 3
          ],
        },
        {
          id: "9",
          name: "Trần Thị Lan (59 mồ)",
          children: [
            // ĐỜI 2
            { id: "22", name: "Hoàng Thị Lan (56 mồ)", children: [] }, // ĐỜI 3
            { id: "23", name: "Phạm Văn Quân (60 mồ)", children: [] }, // ĐỜI 3
          ],
        },
      ],
    },
  ],
};
