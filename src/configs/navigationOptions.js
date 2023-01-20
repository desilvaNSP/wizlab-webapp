import BaseUrls from "./baseUrls";

const {
  FILM_MASTER_BASE_END_POINT,
  FILM_SCHEDULER_BASE_END_POINT,
  MANAGER_PORTAL_BASE_END_POINT
} = BaseUrls;

export default [
  {
    id: "MASTER",
    name: "Film Master Records",
    path: `${FILM_MASTER_BASE_END_POINT}`,
    type: "external",
    is_active: false,
    sub_options: [
      {
        id: "MASTER_ADD",
        name: "Add Master Record",
        path: `${FILM_MASTER_BASE_END_POINT}/add-master-record`,
        type: "external",
        is_active: false
      },
      {
        id: "MASTER_RECORDS",
        name: "Film Records",
        path: `${FILM_MASTER_BASE_END_POINT}/film-master-records`,
        type: "external",
        is_active: false
      }
    ]
  },
  {
    id: "SCHEDULE",
    name: "Film Scheduling",
    path: `${FILM_SCHEDULER_BASE_END_POINT}`,
    type: "external",
    is_active: false,
    sub_options: [
      {
        id: "SCHEDULE_UPCOMING",
        name: "Upcoming",
        path: `${FILM_SCHEDULER_BASE_END_POINT}`,
        type: "external",
        is_active: false
      },
      {
        id: "SCHEDULE_HOLDOVER",
        name: "Holdover",
        path: `${FILM_SCHEDULER_BASE_END_POINT}/holdover`,
        type: "external",
        is_active: false
      },
      {
        id: "SCHEDULE_SCHEDULE",
        name: "Scheduling",
        path: `${FILM_SCHEDULER_BASE_END_POINT}/schedule`,
        type: "external",
        is_active: false
      },
      {
        id: "SCHEDULE_SWAPS",
        name: "Swaps",
        path: `${FILM_SCHEDULER_BASE_END_POINT}/swaps`,
        type: "external",
        is_active: false
      }
    ]
  },
  //   {
  //     id: "CONTRACT",
  //     name: "Film Contract",
  //     path: "/",
  //     type: "internal",
  //     is_active: false,
  //     sub_options: [
  //       {
  //         id: "CONTRACT_CONTRACT",
  //         name: "Film Contracts",
  //         path: "/",
  //         type: "internal",
  //         is_active: false
  //       }
  //     ]
  //   },
  {
    id: "MANAGERPORTAL",
    name: "Manager Portal",
    path: `${MANAGER_PORTAL_BASE_END_POINT}/#/landing`,
    type: "external",
    is_active: false,
    sub_options: []
  }
];
