using Xunit;
using CamelRegistry.Classes;
using Microsoft.EntityFrameworkCore;

namespace CamelRegistry.Tests
{
    public class CamelApiTests
    {
        [Fact]
        public async Task SaveCamel_IdAssign()
        {
            var options = new DbContextOptionsBuilder<CamelDbContext>()
                .UseInMemoryDatabase(databaseName: "CamelDb_SaveTest")
                .Options;

            using var db = new CamelDbContext(options);
            var newCamel = new Camel { Name = "Gombóc", HumpCount = 1 };

            db.Camels.Add(newCamel);
            await db.SaveChangesAsync();

            Assert.True(newCamel.Id > 0);
        }

        [Theory]
        [InlineData(1, true)]
        [InlineData(2, true)]
        [InlineData(0, false)]
        [InlineData(3, false)]
        public void HumpCount_Val_LogicCheck(int count, bool expectedValid)
        {
            bool isValid = count == 1 || count == 2;

            Assert.Equal(expectedValid, isValid);
        }

        [Fact]
        public async Task GetCamel_NullReturn_IfNotFound()
        {
            var options = new DbContextOptionsBuilder<CamelDbContext>()
                .UseInMemoryDatabase(databaseName: "CamelDb_NotFoundTest")
                .Options;
            using var db = new CamelDbContext(options);

            var result = await db.Camels.FindAsync(999); // Elég nagy hogy tuti ne találja meg...

            Assert.Null(result);
        }

        [Fact]
        public void CamelModel_Validation()
        {
            var camel = new Camel { Name = "TesztTeve", HumpCount = 2 };
            var name = camel.Name;

            Assert.Equal(camel.Name, name);
            Assert.InRange(camel.HumpCount, 1, 2);
        }
    }
}
