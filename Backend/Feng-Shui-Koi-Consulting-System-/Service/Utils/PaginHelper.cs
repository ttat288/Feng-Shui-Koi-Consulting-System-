namespace Service.Utils
{
    public class PaginHelper
    {
        public static int PageCount(int totalCount, int pageSize)
        {
            /*
            each page site have ... elements
            get the total of page count
            */
            var pageCount = (int)Math.Ceiling(totalCount / (double)pageSize);
            return pageCount;
        }
    }
}
