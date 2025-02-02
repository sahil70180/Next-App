class ApiFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): ApiFilters {
    const location = this.queryStr?.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...location });
    return this;
  }

  filter(): ApiFilters {
    const querycopy = { ...this.queryStr };
    const removeFields = ["location", "page"];
    removeFields.forEach((el) => delete querycopy[el]);

    this.query = this.query.find(querycopy);
    return this;
  }

  pagination(resPerPage: number): ApiFilters {
    const currentPage = Number(this.queryStr?.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default ApiFilters;
